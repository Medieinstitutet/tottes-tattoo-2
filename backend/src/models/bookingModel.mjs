import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Namn måste anges'] 
  },
  email: { 
    type: String, 
    required: [true, 'E-post måste anges'] 
  },
  date: { 
    type: String, 
    required: [true, 'Datum måste anges'] 
  },
  time: { 
    type: String, 
    required: [true, 'Tid måste anges'] 
  },
  duration: { 
    type: Number, 
    required: [true, 'Varaktighet måste anges'],
    min: [60, 'Minsta bokningstid är 1 timme'],
    max: [480, 'Längsta bokningstid är 8 timmar (en heldag)']
  },
  type: { 
    type: String, 
    enum: ['tattoo', 'consultation'], 
    required: [true, 'Typ måste anges'] 
  },
  tattooer: { 
    type: String,
    required: [true, 'Tatuerare måste anges']
  },
  filePath: { 
    type: String 
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

export const readBookings = async () => {
  return await Booking.find();
};

export const saveBooking = async (newBooking) => {
  const booking = new Booking(newBooking);
  return await booking.save();
};

export const findOverlappingBookings = async (date, startTime, duration) => {
  const bookings = await Booking.find({ date });

  const requestedStart = new Date(`${date}T${startTime}`);
  const requestedEnd = new Date(requestedStart.getTime() + duration * 60000); 

  const overlappingCount = bookings.filter(booking => {
    const bookingStart = new Date(`${booking.date}T${booking.time}`);
    const bookingEnd = new Date(bookingStart.getTime() + booking.duration * 60000);

    return (
      (requestedStart >= bookingStart && requestedStart < bookingEnd) || 
      (requestedEnd > bookingStart && requestedEnd <= bookingEnd) || 
      (requestedStart <= bookingStart && requestedEnd >= bookingEnd) 
    );
  }).length;

  return overlappingCount >= 5;
};

export const findOccupiedSlots = async () => {
  const bookings = await Booking.find({}, { 
    date: 1, 
    time: 1, 
    duration: 1, 
    _id: 0 
  });
  
  return bookings.map(b => ({ 
    date: b.date, 
    time: b.time, 
    duration: b.duration 
  }));
};