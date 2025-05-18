import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  id: { type: Number, default: Date.now },
  name: { type: String, required: [true, 'Namn måste anges'] },
  email: { type: String, required: [true, 'Email måste anges'] },
  date: { type: String, required: [true, 'Datum måste anges'] },
  time: { type: String, required: [true, 'Tid måste anges'] },
  duration: { type: Number, required: [true, 'Varaktighet måste anges'] },
  type: { type: String, required: [true, 'Typ måste anges'] },
  tattooer: { type: String, required: [true, 'Tatuerare måste anges'] },
  filePath: { type: String },
  additionalInfo: { type: String }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
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

export const findBookingById = async (id) => {
  return await Booking.findOne({ id: id });
};

export const findOccupiedSlots = async () => {
  const bookings = await Booking.find({}, { date: 1, time: 1, tattooer: 1, duration: 1, _id: 0 });
  return bookings.map(b => ({
    date: b.date,
    time: b.time,
    tattooer: b.tattooer,
    duration: b.duration
  }));
};

export const getAvailableSlots = async (date) => {
  const bookings = await Booking.find({ date });
  const workHours = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
  
  return workHours.filter(time => {
    const bookingsAtTime = bookings.filter(b => b.time === time);
    return bookingsAtTime.length < 5; // Vi har 5 tatuerare
  });
};

export const deleteBooking = async (bookingId) => {
  return await Booking.findOneAndDelete({ id: bookingId });
};

export const updateBooking = async (bookingId, updatedData) => {
  return await Booking.findOneAndUpdate(
    { id: bookingId },
    updatedData,
    { new: true, runValidators: true }
  );
};