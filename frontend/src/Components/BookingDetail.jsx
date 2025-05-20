import React from 'react';

export default function BookingDetail({ booking, onClose }) {
  if (!booking) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#222',
        color: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 32px rgba(0,0,0,0.4)',
        padding: '2rem',
        zIndex: 1000,
        minWidth: '350px',
        maxWidth: '90vw',
      }}>
      {/* Bild */}
      <img
        src={booking.image || '/default-booking.jpg'}
        alt='Booking'
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
          borderRadius: '12px',
          marginBottom: '1rem',
        }}
      />

      {/* Tillbaka-knapp */}
      <button
        style={{
          width: '100%',
          background: '#d4af37',
          color: '#222',
          fontWeight: 'bold',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          padding: '0.6rem',
          marginBottom: '1.2rem',
          cursor: 'pointer',
        }}
        onClick={onClose}>
        Tillbaka
      </button>

      {/* Bokningsdetaljer */}
      <div style={{ textAlign: 'left' }}>
        <b>Bokningsdetaljer</b>
        <div>Typ: {booking.type}</div>
        <div>Datum: {booking.date}</div>
        <div>Tid: {booking.time}</div>
        <div>Kund: {booking.customer || booking.name}</div>
        <div>Önskemål: {booking.request}</div>
        <div>Varaktighet: {booking.duration}</div>
        <div>Tatuerare: {booking.artist || '-'}</div>
        <div>E-post: {booking.email || '-'}</div>
      </div>
    </div>
  );
}
