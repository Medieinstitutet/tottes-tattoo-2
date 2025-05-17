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
      <p>Kund: {booking.customer}</p>
      <p>
        Tid: {booking.date} {booking.time}
      </p>
      <p>Längd: {booking.duration}</p>
      <p>Önskemål: {booking.request}</p>
      {booking.file && (
        <p>
          Bifogad fil:{' '}
          <a href={booking.file} target='_blank' rel='noopener noreferrer'>
            Visa fil
          </a>
        </p>
      )}
      <button onClick={onClose}>Stäng</button>
    </div>
  );
}
