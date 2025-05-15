import AppError from '../models/appError.mjs';
import Booking from '../models/Booking.mjs';

export default class BookingRepository {
  async listAll() {
    return await Booking.find();
  }

  async findById(id) {
    // if (!booking) {
    //   throw new AppError('Booking not found', 404);
    // }

    return await Booking.findOne({ id: id });
  }

  async add(booking) {
    return await Booking.create(booking);
  }

  async update(id, updatedBooking) {
    const booking = await Booking.findOne({ id: id });

    // if (!booking) {
    //   throw new AppError('Booking not found', 404);
    // }

    console.log(updatedBooking);
    Object.assign(booking, updatedBooking);
    return await booking.save();
  }

  async remove(id) {
    return await Booking.deleteOne({ id: id });
  }
}

// TODO - Implement the get available times schedule.

// /api/v1/bookings
//   - GET    /                    - Hämta alla bokningar
//   - GET    /:id                 - Hämta specifik bokning
//   - POST   /                    - Skapa ny bokning
//   - PUT    /:id                 - Uppdatera bokning
//   - DELETE /:id                 - Ta bort bokning

//   - GET    /available           - Hämta lediga tider
