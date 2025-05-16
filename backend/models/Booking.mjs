import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: [true, 'Name is required'],
  },
  dateAndTime: {
    type: Date,
    required: [true, 'Date is required'], // should include regexp to spot incorectly formated Dates.
  },
  durationInHours: {
    type: Number,
    required: [true, 'Duration is required'],
    min: [
      1,
      'Booking must exceed one hour in length. Enter a value bigger or equal to 1',
    ],
  },
  employee: {
    type: String,
    required: [true, 'Assigned employee is required'],
    trim: true,
  },
  purpose: {
    type: String,
    enum: ['tattoo', 'consultation'],
    required: [
      true,
      'Purpose of the booking is required and must be either tattoo or consultation.',
    ],
  },
  description: {
    type: String,
    trim: true,
  },
  imageUrl: {
    type: String,
  },
});

export default mongoose.model('Booking', bookingSchema);
