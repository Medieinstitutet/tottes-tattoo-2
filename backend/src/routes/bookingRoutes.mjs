import express from 'express';
import {
  createBooking,
  getBookings,
  getOccupiedSlots,
  getAvailableSlots,
} from '../controllers/bookingController.mjs';
import upload from '../middleware/upload.mjs';

const router = express.Router();

router.post('/', upload.single('sketch'), createBooking);
router.get('/', getBookings);
router.get('/occupied', getOccupiedSlots);
router.get('/slots', getAvailableSlots);

export default router;