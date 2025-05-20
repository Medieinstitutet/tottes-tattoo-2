import React, { useEffect, useState } from 'react';

function AdminBookings({ onBack }) {
  const [allBookings, setAllBookings] = useState([]);

  useEffect(() => {
    // Byt ut URL till din backend-endpoint om det behövs
    fetch('/api/bookings')
      .then((res) => res.json())
      .then((data) => setAllBookings(data));
  }, []);

  return (
    <div
      style={{
        background: '#222',
        color: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
        padding: '2rem',
        maxWidth: '1100px',
        margin: '2rem auto',
        overflowX: 'auto',
        border: '2px solid #d4af37',
        position: 'relative',
      }}>
      <button
        style={{
          background: '#d4af37',
          color: '#222',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          padding: '0.7rem 1.5rem',
          marginBottom: '2rem',
          cursor: 'pointer',
          fontSize: '1.1rem',
          display: 'block',
          margin: '0 auto',
        }}
        onClick={() => {
          /* valfri funktion, t.ex. ladda om */
        }}>
        Visa alla bokningar
      </button>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          background: 'transparent',
        }}>
        <thead>
          <tr style={{ background: '#d4af37', color: '#222' }}>
            <th style={{ padding: '0.7rem' }}>Datum</th>
            <th style={{ padding: '0.7rem' }}>Tid</th>
            <th style={{ padding: '0.7rem' }}>Kund</th>
            <th style={{ padding: '0.7rem' }}>Typ</th>
            <th style={{ padding: '0.7rem' }}>Tatuerare</th>
          </tr>
        </thead>
        <tbody>
          {allBookings.map((booking) => (
            <tr
              key={booking._id || booking.id}
              style={{ borderBottom: '1px solid #444' }}>
              <td style={{ padding: '0.7rem' }}>{booking.date}</td>
              <td style={{ padding: '0.7rem' }}>{booking.time}</td>
              <td style={{ padding: '0.7rem' }}>
                {booking.customer || booking.name}
              </td>
              <td style={{ padding: '0.7rem' }}>{booking.type}</td>
              <td style={{ padding: '0.7rem' }}>{booking.artist}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{
          background: '#d4af37',
          color: '#222',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          padding: '0.7rem 1.5rem',
          marginTop: '2rem',
          cursor: 'pointer',
          fontSize: '1.1rem',
          display: 'block',
          margin: '2rem auto 0 auto',
        }}
        onClick={onBack}>
        Tillbaka
      </button>
    </div>
  );
}

export default AdminBookings;
