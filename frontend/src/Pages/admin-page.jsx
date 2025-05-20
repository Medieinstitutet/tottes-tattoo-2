import React, { useEffect, useState } from 'react';
import Navigation from '../Components/NavBar';
import Footer from '../Components/Footer';
import styled from 'styled-components';
import BookingList from '../Components/BookingList';
import BookingDetail from '../Components/BookingDetail';
import '../styles/admin-page.css';
import adminBg from '../assets/admin_bg.jpg';
import ArtistList from '../Components/admin/ArtistList';
import AdminBookings from '../Components/AdminBookings';
import AvailableTimes from '../Components/AvailableTimes';

const Wrapper = styled.div`
  min-height: 80vh;
  font-family: 'Roboto', 'Georgia', Arial, sans-serif;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background};
  padding: 2rem;
  background-image: url(${adminBg});
  background-size: cover;
  background-position: center;
`;

const buttonStyle = {
  background: '#d4af37',
  color: '#222',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  padding: '1rem 2.5rem',
  fontSize: '1.2rem',
  cursor: 'pointer',
  marginBottom: '1.5rem',
};

const ADMIN_USERNAME = 'employee'; // Change to your desired username
const ADMIN_PASSWORD = 'password123'; // Change to your desired password

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [artists, setArtists] = useState([
    { id: 1, name: 'Totte Lindström' },
    { id: 2, name: 'Anders Lindström' },
    { id: 3, name: 'Erik Sandberg' },
    { id: 4, name: 'Marcus Diaz' },
    { id: 5, name: 'Amanda Berg' },
  ]);
  const [adminView, setAdminView] = useState('menu'); // 'menu', 'all', 'available', 'individual'

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Fel användarnamn eller lösenord');
    }
  };

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/artists')
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0) {
          setArtists([
            { id: 1, name: 'Totte Lindström' },
            { id: 2, name: 'Anders Lindström' },
            { id: 3, name: 'Erik Sandberg' },
            { id: 4, name: 'Marcus Diaz' },
            { id: 5, name: 'Amanda Berg' },
          ]);
        } else {
          setArtists(data);
        }
      });
  }, []);

  useEffect(() => {
    if (selectedArtist) {
      // Byt ut mot riktigt API-anrop om det finns, annars mockdata:
      fetch(`http://localhost:3000/api/v1/bookings`)
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

  if (!loggedIn) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Navigation />
        <div style={{ flex: 1 }}>
          <form
            onSubmit={handleLogin}
            style={{
              maxWidth: 300,
              margin: '8rem auto 0 auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
            <h2>Logga in som anställd</h2>
            <input
              type='text'
              placeholder='Användarnamn'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type='password'
              placeholder='Lösenord'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Logga in</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <Wrapper>
        {adminView === 'menu' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '7rem',
              flexWrap: 'wrap',
              alignItems: 'flex-start',
              minHeight: '400px',
            }}>
            {/* Kort 1: Alla bokningar */}
            <div
              style={{
                background: '#222',
                color: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                padding: '1.5rem 1.5rem',
                minWidth: '260px',
                maxWidth: '320px',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '2px solid #d4af37',
              }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                📋
              </span>
              <h3>Alla bokningar</h3>
              <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                Se och hantera alla bokningar i systemet.
              </p>
              <button style={buttonStyle} onClick={() => setAdminView('all')}>
                Gå till bokningar
              </button>
            </div>

            {/* Kort 2: Alla lediga tider */}
            <div
              style={{
                background: '#222',
                color: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                padding: '1.5rem 1.5rem',
                minWidth: '260px',
                maxWidth: '320px',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '2px solid #d4af37',
              }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                🕒
              </span>
              <h3>Alla lediga tider</h3>
              <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                Se översikt över alla lediga tider.
              </p>
              <button
                style={buttonStyle}
                onClick={() => setAdminView('available')}>
                Gå till lediga tider
              </button>
            </div>

            {/* Kort 3: Individuella bokningar */}
            <div
              style={{
                background: '#222',
                color: '#fff',
                borderRadius: '16px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
                padding: '1.5rem 1.5rem',
                minWidth: '260px',
                maxWidth: '320px',
                minHeight: '340px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '2px solid #d4af37',
              }}>
              <span style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
                👤
              </span>
              <h3>Individuella bokningar</h3>
              <p style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                Se bokningar per tatuerare.
              </p>
              <button
                style={buttonStyle}
                onClick={() => setAdminView('individual')}>
                Gå till tatuerare
              </button>
            </div>
          </div>
        )}
        {adminView === 'all' && (
          <>
            <button style={buttonStyle} onClick={() => setAdminView('menu')}>
              Tillbaka
            </button>
            <AdminBookings onBack={() => setAdminView('menu')} />
          </>
        )}
        {adminView === 'available' && (
          <>
            <button style={buttonStyle} onClick={() => setAdminView('menu')}>
              Tillbaka
            </button>
            <h2>Alla lediga tider</h2>
            <AvailableTimes onBack={() => setAdminView('menu')} />
          </>
        )}
        {adminView === 'individual' && (
          <>
            <h2>Tatuerare</h2>
            <ArtistList
              artists={artists}
              onSelect={(artist) => {
                setSelectedArtist(artist);
                setSelectedBooking(null);
              }}
              selectedArtist={selectedArtist}
              bookings={bookings}
              onBookingSelect={setSelectedBooking}
            />
            <BookingDetail
              booking={selectedBooking}
              onClose={() => setSelectedBooking(null)}
            />
            <button
              style={{
                background: '#d4af37',
                color: '#222',
                fontWeight: 'bold',
                border: 'none',
                borderRadius: '8px',
                padding: '0.5rem 1rem',
                margin: '2.5rem auto 0 auto',
                cursor: 'pointer',
                fontSize: '1.1rem',
                display: 'block',
              }}
              onClick={() => setAdminView('menu')}>
              Tillbaka
            </button>
          </>
        )}
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
