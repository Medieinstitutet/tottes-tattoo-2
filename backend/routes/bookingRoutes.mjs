import express from 'express';
import {
  listAllBookings,
  findBookingById,
  addBooking,
  updateBooking,
  removeBooking,
} from '../controllers/booking-controller.mjs';

const bookingRouter = express.Router();

bookingRouter.route('/').get(listAllBookings).post(addBooking);
bookingRouter
  .route('/id/:id')
  .get(findBookingById)
  .put(updateBooking)
  .post(removeBooking);

export default bookingRouter;
