import React, { useEffect, useState } from 'react';

export default function AvailableTimes({ onBack }) {
  const [times, setTimes] = useState([]);

  useEffect(() => {
    // Byt ut mot din riktiga endpoint om du har en
    fetch('/api/available-times')
      .then((res) => res.json())
      .then((data) => setTimes(data))
      .catch(() => {
        // Mockdata om API saknas
        setTimes([
          {
            id: 1,
            date: '2024-06-01',
            time: '10:00',
            artist: 'Totte Lindström',
          },
          { id: 2, date: '2024-06-01', time: '13:00', artist: 'Amanda Berg' },
          { id: 3, date: '2024-06-02', time: '09:00', artist: 'Erik Sandberg' },
        ]);
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          marginTop: '4rem',
        }}>
        {times.map((time) => (
          <div
            key={time.id}
            style={{
              background: '#222',
              color: '#fff',
              borderRadius: '16px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              padding: '1.5rem 2rem',
              minWidth: '220px',
              maxWidth: '260px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '2px solid #d4af37',
            }}>
            <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🕒</span>
            <div>
              <b>Datum:</b> {time.date}
            </div>
            <div>
              <b>Tid:</b> {time.time}
            </div>
            <div>
              <b>Tatuerare:</b> {time.artist}
            </div>
          </div>
        ))}
      </div>
      {/* <button
        style={{
          background: '#d4af37',
          color: '#222',
          fontWeight: 'bold',
          border: 'none',
          borderRadius: '8px',
          padding: '0.5rem 0.3rem',
          minWidth: '80px',
          margin: '2.5rem auto 0 auto',
          cursor: 'pointer',
          fontSize: '1.1rem',
          display: 'block',
        }}
        onClick={onBack}>
        Tillbaka
      </button> */}
    </>
  );
}
