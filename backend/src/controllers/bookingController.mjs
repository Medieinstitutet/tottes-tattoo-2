import { saveBooking, readBookings } from '../models/bookingModel.mjs';

export const createBooking = async (req, res, next) => {
  try {
    const { name, email, date, time, type } = req.body;
    const file = req.file;

    if (!name || !email || !date || !time || !type || !file) {
      return res
        .status(400)
        .json({ success: false, message: 'All fields are required.' });
    }

    if (!['tattoo', 'consultation'].includes(type.toLowerCase())) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid booking type.' });
    }

    const [hourStr, minuteStr] = time.split(':');
    const hour = parseInt(hourStr, 10);
    const minute = parseInt(minuteStr, 10);

    if (
      isNaN(hour) ||
      isNaN(minute) ||
      hour < 0 ||
      hour > 23 ||
      minute < 0 ||
      minute > 59
    ) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid time format.' });
    }

    // Reject bookings during lunch
    if (hour === 12) {
      return res.status(400).json({
        success: false,
        message: 'Bookings are closed for lunch between 12:00 and 13:00.',
      });
    }

    // Reject bookings outside working hours
    if (hour < 9 || hour >= 18) {
      return res.status(400).json({
        success: false,
        message: 'Bookings must be between 09:00 and 18:00.',
      });
    }

    // Reject weekend bookings
    const bookingDate = new Date(`${date}T${time}`);
    const dayOfWeek = bookingDate.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return res.status(400).json({
        success: false,
        message: 'Bookings are only available Monday to Friday.',
      });
    }

    // Check if this time is already booked
    const existingBookings = await readBookings();
    const isTaken = existingBookings.some(
      (b) => b.date === date && b.time === time
    );
    if (isTaken) {
      return res.status(400).json({
        success: false,
        message: 'That time slot is already booked. Please choose another.',
      });
    }

    // Assign a random tattooer
    const tattooers = ['Totte', 'Emma', 'Johan', 'Nina', 'Alex'];
    const assignedTattooer =
      tattooers[Math.floor(Math.random() * tattooers.length)];

    const booking = {
      id: Date.now(),
      name,
      email,
      date,
      time,
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
    const bookings = await readBookings();

    const occupied = bookings.map((b) => ({
      date: b.date,
      time: b.time,
    }));

    res.json(occupied);
  } catch (err) {
    next(err);
  }
};
