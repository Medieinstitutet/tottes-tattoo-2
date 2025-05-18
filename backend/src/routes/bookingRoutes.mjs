import express from 'express';
import {
  createBooking,
  getBookings,
  getBookingById,
  getOccupiedSlots,
  getAvailableSlots,
  deleteBookingById,
  updateBookingById,
  uploadBookingFile,
  getAvailableTattooers
} from '../controllers/bookingController.mjs';
import upload from '../middleware/upload.mjs';

const router = express.Router();

router.post('/', upload.single('file'), createBooking);
router.get('/', getBookings);
router.get('/occupied', getOccupiedSlots);
router.get('/available', getAvailableSlots);
router.get('/available-slots', getAvailableSlots);
router.get('/available-tattooers', getAvailableTattooers);
router.get('/:id', getBookingById);
router.delete('/:id', deleteBookingById);
router.put('/:id', updateBookingById);
router.post('/:id/upload', upload.single('file'), uploadBookingFile);

export default router;