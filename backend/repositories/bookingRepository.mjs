import Booking from '../models/Booking.mjs';

export default class BookingRepository {
  async listAll() {
    return await Booking.find();
  }

  async findById(id) {
    return await Booking.findOne({ _id: id });
  }

  async add(booking) {
    return await Booking.create(booking);
  }

  async update(id, updatedBooking) {
    const booking = await Booking.findOne({ _id: id });
    Object.assign(booking, updatedBooking);
    return await booking.save();
  }

  async remove(id) {
    return await Booking.deleteOne({ _id: id });
  }
}

// /api/v1/bookings
//   - GET    /                    - Hämta alla bokningar
//   - GET    /:id                 - Hämta specifik bokning
//   - POST   /                    - Skapa ny bokning
//   - PUT    /:id                 - Uppdatera bokning
//   - DELETE /:id                 - Ta bort bokning
