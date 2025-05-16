import React, { useEffect, useState } from 'react';
import Navigation from '../Components/NavBar';
import Footer from '../Components/Footer';
import styled from 'styled-components';
import BookingList from '../Components/BookingList';
import BookingDetail from '../Components/BookingDetail';
import '../styles/admin-page.css';
import adminBg from '../assets/admin_bg.jpg';

const Wrapper = styled.div`
  min-height: 80vh;
  font-family: ${({ theme }) => theme.fonts.main};
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  background-image: url(${adminBg});
  background-size: cover;
  background-position: center;
`;

export default function AdminPage() {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/artists')
      .then((res) => res.json())
      .then((data) => setArtists(data));
  }, []);

  useEffect(() => {
    if (selectedArtist) {
      // Byt ut mot riktigt API-anrop om det finns, annars mockdata:
      fetch(
        `http://localhost:3000/api/v1/bookings?artistId=${
          selectedArtist._id || selectedArtist.id
        }`
      )
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch(() => {
          // Mockdata om API inte finns
          setBookings([
            {
              id: '1',
              date: '2024-05-20',
              time: '10:00',
              type: 'Konsultation',
              customer: 'Lisa',
              duration: '1 timme',
              request: 'Drake på armen',
              file: '',
            },
            {
              id: '2',
              date: '2024-05-20',
              time: '13:00',
              type: 'Tatuering',
              customer: 'Lisa',
              duration: '2 timmar',
              request: 'Drake på armen',
              file: '',
            },
          ]);
        });
    } else {
      setBookings([]);
    }
  }, [selectedArtist]);

  return (
    <>
      <Navigation />
      <Wrapper>
        <h2>Tatuerare</h2>
        <ul>
          {artists.map((artist) => (
            <li
              key={artist._id || artist.id}
              style={{ cursor: 'pointer', marginBottom: '0.5rem' }}
              onClick={() => {
                setSelectedArtist(artist);
                setSelectedBooking(null);
              }}>
              {artist.name} – {artist.specialty}
            </li>
          ))}
        </ul>
        {selectedArtist && (
          <>
            <h3>Bokningar för {selectedArtist.name}</h3>
            <BookingList bookings={bookings} onSelect={setSelectedBooking} />
          </>
        )}
        <BookingDetail
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
        />
      </Wrapper>
      <Footer>
        <b>Tottes Tattoo</b> &copy; 2024. Alla rättigheter förbehållna.
        <br />
        Din väg till unika fantasy-tatueringar.
        <div
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
          }}>
          <a
            href='#'
            aria-label='Instagram'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: '#d4af37', fontSize: '2rem' }}>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <rect x='2' y='2' width='20' height='20' rx='5' ry='5' />
              <path d='M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z' />
              <line x1='17.5' y1='6.5' x2='17.5' y2='6.5' />
            </svg>
          </a>
          <a
            href='#'
            aria-label='Facebook'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: '#d4af37', fontSize: '2rem' }}>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M18 2h-3a4 4 0 0 0-4 4v3H7v4h4v8h4v-8h3l1-4h-4V6a1 1 0 0 1 1-1h3z' />
            </svg>
          </a>
          <a
            href='#'
            aria-label='YouTube'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: '#d4af37', fontSize: '2rem' }}>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <rect x='2' y='7' width='20' height='10' rx='3' ry='3' />
              <polygon points='10 9 15 12 10 15 10 9' />
            </svg>
          </a>
          <a
            href='#'
            aria-label='X'
            target='_blank'
            rel='noopener noreferrer'
            style={{ color: '#d4af37', fontSize: '2rem' }}>
            <svg
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M18 6L6 18M6 6l12 12' />
            </svg>
          </a>
        </div>
      </Footer>
    </>
  );
}
