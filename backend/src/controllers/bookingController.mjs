import ErrorResponse from '../utilities/errorResponse.mjs';
import { saveBooking, readBookings, findOccupiedSlots, deleteBooking, updateBooking } from '../models/bookingModel.mjs';
import { validateEmail, isValidDate, isValidTimeFormat, isWithinWorkingHours, isNotLunchHour, isWeekday } from '../utilities/validators.mjs';


export const createBooking = async (req, res, next) => {
  try {
    const { name, email, date, time, type, duration, additionalInfo, tattooer } = req.body;
    const file = req.file;

    if (!name || !email || !date || !time || !type || !file || !duration || !tattooer) {
      throw new ErrorResponse('All fields except additionalInfo are required.', 400);
    }

    if (!validateEmail(email)) {
      throw new ErrorResponse('Invalid email address.', 400);
    }

    if (!isValidDate(date)) {
      throw new ErrorResponse('Invalid date format.', 400);
    }

    if (!isValidTimeFormat(time)) {
      throw new ErrorResponse('Invalid time format.', 400);
    }

    if (!isWithinWorkingHours(time)) {
      throw new ErrorResponse('Bookings must be between 09:00 and 18:00.', 400);
    }

    if (!isNotLunchHour(time)) {
      throw new ErrorResponse('Bookings are closed for lunch between 12:00 and 13:00.', 400);
    }

    if (!isWeekday(date)) {
      throw new ErrorResponse('Bookings are only available Monday to Friday.', 400);
    }

    const durationNum = parseInt(duration, 10);
    if (isNaN(durationNum) || durationNum < 60 || durationNum > 480) {
      throw new ErrorResponse('Duration must be between 60 and 480 minutes.', 400);
    }

    // Kontrollera att bokningen inte går över stängningstiden
    const bookingStart = new Date(`2000-01-01T${time}`);
    const bookingEnd = new Date(bookingStart.getTime() + durationNum * 60000);
    const closingTime = new Date(`2000-01-01T18:00`);
    
    if (bookingEnd > closingTime) {
      throw new ErrorResponse('Booking cannot extend past closing time (18:00).', 400);
    }

    // Kontrollera om vald tatuerare är tillgänglig
    const existingBookings = await findOccupiedSlots();
    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + parseInt(duration) * 60 * 1000);

    const overlappingBookings = existingBookings.filter(b => {
      if (b.date !== date) return false;
      const bStart = new Date(`${date}T${b.time}:00`);
      const bEnd = new Date(bStart.getTime() + b.duration * 60 * 1000);
      return startTime < bEnd && endTime > bStart && b.tattooer === tattooer;
    });

    if (overlappingBookings.length > 0) {
      throw new ErrorResponse('Selected tattooer is not available for this time slot.', 400);
    }

    const booking = {
      id: Date.now(),
      name,
      email,
      date,
      time,
      duration: parseInt(duration),
      type: type.toLowerCase(),
      tattooer,
      filePath: file.path,
      additionalInfo
    };

    await saveBooking(booking);
    res.json({
      success: true,
      message: 'Booking saved.',
      tattooer: tattooer,
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
      throw new ErrorResponse('Datum krävs', 400);
    }

    if (!isValidDate(date)) {
      throw new ErrorResponse('Ogiltigt datumformat', 400);
    }

    if (!isWeekday(date)) {
      throw new ErrorResponse('Bokningar är endast tillgängliga måndag till fredag', 400);
    }

    const bookings = await readBookings();
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
        // Räkna bokningar för denna tid
        const bookingsAtTime = bookings.filter(b => b.date === date && b.time === slotTime);
        if (bookingsAtTime.length < 5) { // Mindre än 5 tatuerare bokade
          availableSlots.push(slotTime);
        }
        current.setMinutes(current.getMinutes() + 60); // 1-timmesintervall
      }
    });

    res.json(availableSlots);
  } catch (err) {
    next(err);
  }
};

export const deleteBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const deletedBooking = await deleteBooking(parseInt(id));
    
    if (!deletedBooking) {
      throw new ErrorResponse('Bokning hittades inte', 404);
    }

    res.json({
      success: true,
      message: 'Bokning borttagen',
      data: deletedBooking
    });
  } catch (err) {
    next(err);
  }
};

export const updateBookingById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validera uppdateringar
    if (updates.email && !validateEmail(updates.email)) {
      throw new ErrorResponse('Ogiltig e-postadress', 400);
    }

    if (updates.date) {
      if (!isValidDate(updates.date)) {
        throw new ErrorResponse('Ogiltigt datumformat', 400);
      }
      if (!isWeekday(updates.date)) {
        throw new ErrorResponse('Bokningar är endast tillgängliga måndag till fredag', 400);
      }
    }

    if (updates.time) {
      if (!isValidTimeFormat(updates.time)) {
        throw new ErrorResponse('Ogiltigt tidsformat', 400);
      }
      if (!isWithinWorkingHours(updates.time)) {
        throw new ErrorResponse('Bokningar måste vara mellan 09:00 och 18:00', 400);
      }
      if (!isNotLunchHour(updates.time)) {
        throw new ErrorResponse('Bokningar är stängda för lunch mellan 12:00 och 13:00', 400);
      }
    }

    if (updates.duration) {
      const durationNum = parseInt(updates.duration, 10);
      if (isNaN(durationNum) || durationNum < 60 || durationNum > 480) {
        throw new ErrorResponse('Varaktighet måste vara mellan 60 och 480 minuter', 400);
      }
      updates.duration = durationNum;
    }

    // Om tid eller datum ändras, kontrollera tillgänglighet
    if (updates.time || updates.date) {
      const existingBooking = await readBookings().then(bookings => 
        bookings.find(b => b.id === parseInt(id))
      );

      if (!existingBooking) {
        throw new ErrorResponse('Bokning hittades inte', 404);
      }

      const checkDate = updates.date || existingBooking.date;
      const checkTime = updates.time || existingBooking.time;
      const checkDuration = updates.duration || existingBooking.duration;

      const existingBookings = await findOccupiedSlots();
      const startTime = new Date(`${checkDate}T${checkTime}:00`);
      const endTime = new Date(startTime.getTime() + checkDuration * 60 * 1000);

      const overlappingBookings = existingBookings.filter(b => {
        if (b.date !== checkDate || parseInt(b.id) === parseInt(id)) return false;
        const bStart = new Date(`${b.date}T${b.time}:00`);
        const bEnd = new Date(bStart.getTime() + b.duration * 60 * 1000);
        return startTime < bEnd && endTime > bStart;
      });

      const bookedTattooers = new Set(overlappingBookings.map(b => b.tattooer));
      if (bookedTattooers.size >= 5) {
        throw new ErrorResponse('Alla tatuerare är bokade för denna tid', 400);
      }
    }

    const updatedBooking = await updateBooking(parseInt(id), updates);
    
    if (!updatedBooking) {
      throw new ErrorResponse('Bokning hittades inte', 404);
    }

    res.json({
      success: true,
      message: 'Bokning uppdaterad',
      data: updatedBooking
    });
  } catch (err) {
    next(err);
  }
};

export const getBookingById = async (req, res, next) => {
  try {
    const booking = await findBookingById(parseInt(req.params.id));
    if (!booking) {
      throw new ErrorResponse('Booking not found', 404);
    }
    res.json(booking);
  } catch (err) {
    next(err);
  }
};

export const uploadBookingFile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const file = req.file;

    if (!file) {
      throw new ErrorResponse('No file uploaded', 400);
    }

    const booking = await findBookingById(parseInt(id));
    if (!booking) {
      throw new ErrorResponse('Booking not found', 404);
    }

    const updatedBooking = await updateBooking(parseInt(id), { filePath: file.path });
    res.json({
      success: true,
      message: 'File uploaded successfully',
      data: updatedBooking
    });
  } catch (err) {
    next(err);
  }
};

export const getAvailableTattooers = async (req, res, next) => {
  try {
    const { date, time, duration } = req.query;
    
    if (!date || !time || !duration) {
      throw new ErrorResponse('Date, time and duration are required', 400);
    }

    const existingBookings = await findOccupiedSlots();
    const startTime = new Date(`${date}T${time}:00`);
    const endTime = new Date(startTime.getTime() + parseInt(duration) * 60 * 1000);

    const overlappingBookings = existingBookings.filter(b => {
      if (b.date !== date) return false;
      const bStart = new Date(`${date}T${b.time}:00`);
      const bEnd = new Date(bStart.getTime() + b.duration * 60 * 1000);
      return startTime < bEnd && endTime > bStart;
    });

    const bookedTattooers = new Set(overlappingBookings.map(b => b.tattooer));
    const tattooers = ['Totte', 'Erik', 'Marcus', 'Anders', 'Amanda'];
    const availableTattooers = tattooers.filter(t => !bookedTattooers.has(t));

    res.json(availableTattooers);
  } catch (err) {
    next(err);
  }
};