import express from 'express';
import {
  createBooking,
  getBookings,
  getOccupiedSlots,
  getAvailableSlots,
  deleteBookingById,
  updateBookingById
} from '../controllers/bookingController.mjs';
import upload from '../middleware/upload.mjs';

const router = express.Router();

router.post('/', upload.single('file'), createBooking);
router.get('/', getBookings);
router.get('/occupied', getOccupiedSlots);
router.get('/slots', getAvailableSlots);
router.delete('/:id', deleteBookingById);
router.put('/:id', updateBookingById);

export default router;