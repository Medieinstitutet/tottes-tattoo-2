import { saveBooking, readBookings, findOccupiedSlots } from '../models/bookingModel.mjs';

export const createBooking = async (req, res, next) => {
  try {
    const { name, email, date, time, type, duration } = req.body;
    const file = req.file;

    if (!name || !email || !date || !time || !type || !file || !duration) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!['tattoo', 'consultation'].includes(type.toLowerCase())) {
      return res.status(400).json({ success: false, message: 'Invalid booking type.' });
    }

    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (isNaN(hour) || isNaN(minute) || hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      return res.status(400).json({ success: false, message: 'Invalid time format.' });
    }

    if (hour === 12) {
      return res.status(400).json({
        success: false,
        message: 'Bookings are closed for lunch between 12:00 and 13:00.',
      });
    }

    if (hour < 9 || hour >= 18) {
      return res.status(400).json({
        success: false,
        message: 'Bookings must be between 09:00 and 18:00.',
      });
    }

    const bookingDate = new Date(`${date}T${time}`);
    const dayOfWeek = bookingDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(400).json({
        success: false,
        message: 'Bookings are only available Monday to Friday.',
      });
    }

    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum < 60 || durationNum > 480) {
      return res.status(400).json({
        success: false,
        message: 'Duration must be between 60 and 480 minutes.',
      });
    }

    const existingBookings = await findOccupiedSlots();
    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + durationNum * 60 * 1000);
    const isOverlapping = existingBookings.some(b => {
      if (b.date !== date) return false;
      const [bHour, bMinute] = b.time.split(':').map(Number);
      const bStart = new Date(`${date}T${b.time}:00`);
      const bEnd = new Date(bStart.getTime() + b.duration * 60 * 1000);
      return startTime < bEnd && endTime > bStart;
    });

    if (isOverlapping) {
      return res.status(400).json({
        success: false,
        message: 'The time slot overlaps with another booking.',
      });
    }

    const tattooers = ['Totte', 'Emma', 'Johan', 'Nina', 'Alex'];
    const assignedTattooer = tattooers[Math.floor(Math.random() * tattooers.length)];

    const booking = {
      id: Date.now(),
      name,
      email,
      date,
      time,
      duration: durationNum,
      type: type.toLowerCase(),
      tattooer: assignedTattooer,
      filePath: file.path,
    };

    await saveBooking(booking);
    res.json({
      success: true,
      message: 'Booking saved.',
      tattooer: assignedTattooer,
    });
  } catch (err) {
    next(err);
  }
};

export const getBookings = async (req, res, next) => {
  try {
    const bookings = await readBookings();
    res.json(bookings);
  } catch (err) {
    next(err);
  }
};

export const getOccupiedSlots = async (req, res, next) => {
  try {
    const occupied = await findOccupiedSlots();
    res.json(occupied);
  } catch (err) {
    next(err);
  }
};

export const getAvailableSlots = async (req, res, next) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ success: false, message: 'Datum krävs' });
    }

    const bookingDate = new Date(date);
    const dayOfWeek = bookingDate.getDay();
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(400).json({
        success: false,
        message: 'Bokningar är endast tillgängliga måndag till fredag',
      });
    }

    const bookings = await readBookings();
    const bookedSlots = bookings
      .filter(b => b.date === date)
      .map(b => b.time);

    const workHours = [
      { start: '09:00', end: '12:00' },
      { start: '13:00', end: '18:00' },
    ];

    const availableSlots = [];
    workHours.forEach(({ start, end }) => {
      let current = new Date(`${date}T${start}:00`);
      const endTime = new Date(`${date}T${end}:00`);

      while (current < endTime) {
        const slotTime = current.toTimeString().slice(0, 5);
        if (!bookedSlots.includes(slotTime)) {
          availableSlots.push(slotTime);
        }
        current.setMinutes(current.getMinutes() + 60); 
      }
    });

    res.json(availableSlots);
  } catch (err) {
    next(err);
  }
};