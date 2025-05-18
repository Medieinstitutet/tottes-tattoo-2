import React from 'react';

export default function BookingList({ bookings, onSelect }) {
	return (
		<ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
			{bookings.map((booking) => (
				<li
					key={booking._id || booking.id}
					style={{
						cursor: 'pointer',
						marginBottom: '1rem',
						fontSize: '1.2rem',
						fontWeight: 500,
						marginLeft: '2rem',
					}}
					onClick={() => onSelect(booking)}>
					{booking.date} {booking.time} – {booking.name} – {booking.type}
				</li>
			))}
		</ul>
	);
}
