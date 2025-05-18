import React from 'react';

export default function BookingDetail({ booking, onClose }) {
	if (!booking) return null;
	return (
		<div
			style={{
				border: '1px solid #d4af37',
				padding: '1rem',
				marginTop: '1rem',
			}}>
			<h4>Bokningsdetaljer</h4>
			<p>Typ: {booking.type}</p>
			<p>Kund: {booking.name}</p>
			<p>
				Tid: {booking.date} {booking.time}
			</p>
			<p>Tatuerare: {booking.tattooer}</p>
			<p>E-post: {booking.email}</p>
			{booking.filePath && (
				<p>
					Bifogad fil:{' '}
					<a
						href={booking.filePath}
						target='_blank'
						rel='noopener noreferrer'>
						Visa fil
					</a>
				</p>
			)}
			<button onClick={onClose}>Stäng</button>
		</div>
	);
}
