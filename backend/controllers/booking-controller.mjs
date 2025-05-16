import BookingRepository from '../repositories/bookingRepository.mjs';
import { catchErrorAsync } from '../utilities/catchErrorAsync.mjs';

export const listAllBookings = catchErrorAsync(async (req, res) => {
  const bookings = await new BookingRepository().listAll();
  res.status(200).json({ success: true, data: bookings });
});

export const findBookingById = catchErrorAsync(async (req, res) => {
  const booking = await new BookingRepository().findById(req.params.id);
  res.status(200).json({ success: true, data: booking });
});

export const addBooking = catchErrorAsync(async (req, res) => {
  const booking = await new BookingRepository().add(req.body);
  res.status(201).json({ success: true, data: booking });
});

export const updateBooking = catchErrorAsync(async (req, res) => {
  const booking = await new BookingRepository().update(req.params.id, req.body);
  res.status(201).json({ success: true, data: booking });
});

export const removeBooking = catchErrorAsync(async (req, res) => {
  await new BookingRepository().remove(req.params.id);
  res.status(204).end();
});
