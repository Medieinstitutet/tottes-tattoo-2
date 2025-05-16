import React from 'react';

export default function BookingList({ bookings, onSelect }) {
  return (
    <ul>
      {bookings.map((booking) => (
        <li
          key={booking._id || booking.id}
          style={{ cursor: 'pointer', marginBottom: '0.5rem' }}
          onClick={() => onSelect(booking)}>
          {booking.date} {booking.time} – {booking.type} – {booking.customer}
        </li>
      ))}
    </ul>
  );
}
