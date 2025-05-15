// src/models/bookingModel.mjs
import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  id: { type: Number, default: Date.now },
  name: { type: String, required: [true, 'Namn måste anges'] },
  email: { type: String, required: [true, 'E-post måste anges'] },
  date: { type: String, required: [true, 'Datum måste anges'] },
  time: { type: String, required: [true, 'Tid måste anges'] },
  duration: { type: Number, required: [true, 'Varaktighet måste anges'] },
  type: { type: String, enum: ['tattoo', 'consultation'], required: [true, 'Typ måste anges'] },
  tattooer: { type: String, required: [true, 'Tatuerare måste anges'] },
  filePath: { type: String },
});

const Booking = mongoose.model('Booking', bookingSchema);

export const readBookings = async () => {
  return await Booking.find();
};

export const saveBooking = async (newBooking) => {
  const booking = new Booking(newBooking);
  return await booking.save();
};

export const findOccupiedSlots = async () => {
  const bookings = await Booking.find({}, { date: 1, time: 1, duration: 1, tattooer: 1, _id: 0 });
  return bookings.map(b => ({
    date: b.date,
    time: b.time,
    duration: b.duration,
    tattooer: b.tattooer,
  }));
};