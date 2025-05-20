import React from 'react';
import mantattoo1 from '../../assets/man_tatto1.jpg';
import mantattoo2 from '../../assets/man_tatto2.jpg';
import mantattoo3 from '../../assets/man_tatto3.jpg';
import mantattoo4 from '../../assets/man_tatto4.jpg';
import womantatto from '../../assets/woman_tatto.jpg';

const artistInfo = {
  'Totte Lindström': { img: mantattoo1 },
  'Anders Lindström': { img: mantattoo2 },
  'Erik Sandberg': { img: mantattoo3 },
  'Marcus Diaz': { img: mantattoo4 },
  'Amanda Berg': { img: womantatto },
};

export default function ArtistList({
  artists,
  onSelect,
  selectedArtist,
  bookings,
  onBookingSelect,
}) {
  if (selectedArtist) {
    const info = artistInfo[selectedArtist.name] || {};
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '3rem',
        }}>
        <div
          style={{
            border: '3px solid #ffd700',
            borderRadius: '16px',
            background: '#181512',
            color: '#fff',
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            boxShadow: '0 0 0 4px #ffd70055, 0 4px 24px #0006',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            minWidth: 350,
            maxWidth: 400,
            width: '100%',
          }}>
          <img
            src={info.img || 'https://via.placeholder.com/120'}
            alt={selectedArtist.name}
            style={{
              width: 120,
              height: 120,
              objectFit: 'cover',
              borderRadius: '12px',
              marginBottom: '1.2rem',
              border: '3px solid #d4af37',
            }}
          />
          <button
            style={{
              margin: '1rem 0 1.5rem 0',
              background: '#d4af37',
              color: '#181512',
              border: 'none',
              borderRadius: 6,
              padding: '0.5rem 1.2rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
            onClick={() => onSelect(null)}>
            Tillbaka
          </button>
          <div style={{ width: '100%' }}>
            <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: 8 }}>
              Bokningar
            </h3>
            {bookings && bookings.length > 0 ? (
              <ul style={{ padding: 0, listStyle: 'none', width: '100%' }}>
                {bookings.map((b) => (
                  <li
                    key={b.id}
                    style={{
                      marginBottom: 10,
                      background: '#222',
                      borderRadius: 6,
                      padding: '0.7rem 1rem',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={() => onBookingSelect && onBookingSelect(b)}>
                    <b>
                      {b.date} {b.time}
                    </b>{' '}
                    – {b.type}
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#ccc' }}>Inga bokningar</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Visa alla artister om ingen är vald
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '3rem',
      }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: 1200,
        }}>
        {artists.map((artist) => {
          const info = artistInfo[artist.name] || {};
          return (
            <div
              key={artist.id}
              style={{
                cursor: 'pointer',
                border: '2px solid #d4af37',
                borderRadius: '16px',
                background: '#181512',
                color: '#fff',
                padding: '2rem 1.5rem 1.5rem 1.5rem',
                boxShadow: '0 4px 24px #0006',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                transition: 'transform 0.15s, border 0.2s, box-shadow 0.2s',
                minHeight: 400,
              }}
              onClick={() => onSelect(artist)}>
              <img
                src={info.img || 'https://via.placeholder.com/120'}
                alt={artist.name}
                style={{
                  width: 120,
                  height: 120,
                  objectFit: 'cover',
                  borderRadius: '12px',
                  marginBottom: '1.2rem',
                  border: '3px solid #d4af37',
                }}
              />
              <h3
                style={{
                  color: '#d4af37',
                  margin: 0,
                  fontSize: '1.3rem',
                  letterSpacing: 1,
                }}>
                {artist.name}
              </h3>
            </div>
          );
        })}
        {/* Tillbaka-knapp som kort */}
        <div
          style={{
            border: '2px solid #d4af37',
            borderRadius: '16px',
            background: '#181512',
            color: '#222',
            padding: '2rem 1.5rem 1.5rem 1.5rem',
            boxShadow: '0 4px 24px #0006',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 400,
          }}>
          <button
            style={{
              background: '#d4af37',
              color: '#222',
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '8px',
              padding: '1rem 2.5rem',
              fontSize: '1.2rem',
              cursor: 'pointer',
            }}
            onClick={() => onSelect(null)}>
            Tillbaka
          </button>
        </div>
      </div>
    </div>
  );
}
