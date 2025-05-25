import express from 'express';
import upload from '../imageUpload.mjs';
import {
  listAllBookings,
  findBookingById,
  addBooking,
  updateBooking,
  removeBooking,
} from '../controllers/booking-controller.mjs';

const bookingRouter = express.Router();

bookingRouter
  .route('/')
  .get(listAllBookings)
  .post(upload.single('file'), addBooking);

bookingRouter
  .route('/:id')
  .get(findBookingById)
  .put(updateBooking)
  .delete(removeBooking);

export default bookingRouter;
