import express from 'express';
import {
  createBooking,
  getBookings,
  getOccupiedSlots,
} from '../controllers/bookingController.mjs';
import upload from '../middleware/upload.mjs';

const router = express.Router();

router.post('/', upload.single('file'), createBooking);
router.get('/', getBookings);
router.get('/occupied', getOccupiedSlots);

export default router;
