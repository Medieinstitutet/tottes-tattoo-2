import Booking from '../models/Booking.mjs';
import checkSchedule from '../utilities/checkSchedule.mjs';

export default class BookingRepository {
  async listAvailableTimes(employee, date) {
    const isWeekend = (date) => {
      const day = new Date(date).getDay();
      return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
    };

    if (isWeekend(date)) return [];

    const bookings = await Booking.find({
      $expr: {
        $regexMatch: {
          input: { $toString: '$dateAndTime' },
          regex: `^${date}`,
        },
      },
      employee: { $regex: `^${employee}$`, $options: 'i' },
    });

    return checkSchedule(bookings);
  }
}

// /api/v1/schedule

//   - GET    /:employee/:date           - Hämta lediga tider för angiven tatuerare.

// Example: - GET http://localhost:3000/schedule/totte/2025-05-25
