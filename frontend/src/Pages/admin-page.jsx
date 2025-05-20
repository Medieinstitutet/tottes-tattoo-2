import React, { useEffect, useState } from 'react';
import Navigation from '../Components/NavBar';
import Footer from '../Components/Footer';
import styled from 'styled-components';
import BookingList from '../Components/BookingList';
import BookingDetail from '../Components/BookingDetail';
import '../styles/admin-page.css';
import adminBg from '../assets/admin_bg.jpg';
import ArtistList from '../Components/admin/ArtistList';

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

const ADMIN_USERNAME = 'employee'; // Change to your desired username
const ADMIN_PASSWORD = 'password123'; // Change to your desired password

// API base URL
const API_BASE_URL = 'http://localhost:3000/api/v1';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Fel användarnamn eller lösenord');
    }
  };

  // Fetch artists from backend
  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      fetch(`${API_BASE_URL}/artists`)
        .then((res) => {
          if (!res.ok) throw new Error('API error: ' + res.statusText);
          return res.json();
        })
        .then((data) => {
          if (Array.isArray(data) && data.length > 0) {
            setArtists(data);
          } else {
            console.warn('No artists found, using defaults');
            setArtists([
              { id: '1', name: 'Totte Lindström' },
              { id: '2', name: 'Anders Lindström' },
              { id: '3', name: 'Erik Sandberg' },
              { id: '4', name: 'Marcus Diaz' },
              { id: '5', name: 'Amanda Berg' },
            ]);
          }
        })
        .catch((err) => {
          console.error('Error fetching artists:', err);
          setArtists([
            { id: '1', name: 'Totte Lindström' },
            { id: '2', name: 'Anders Lindström' },
            { id: '3', name: 'Erik Sandberg' },
            { id: '4', name: 'Marcus Diaz' },
            { id: '5', name: 'Amanda Berg' },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loggedIn]);

  // Fetch bookings when an artist is selected
  useEffect(() => {
    if (selectedArtist) {
      setLoading(true);
      fetch(`${API_BASE_URL}/bookings`)
        .then((res) => {
          if (!res.ok) throw new Error('API error: ' + res.statusText);
          return res.json();
        })
        .then((result) => {
          console.log('Bookings from API:', result);

          // Filter bookings for the selected artist
          const bookingsArray = Array.isArray(result.data) ? result.data : [];
          const artistBookings = bookingsArray.filter(
            (b) =>
              (b.employee && selectedArtist.name.includes(b.employee)) ||
              (b.employee &&
                b.employee.includes(selectedArtist.name.split(' ')[0]))
          );

          // Map to the format expected by the frontend
          const mappedBookings = artistBookings.map((b) => ({
            id: b._id,
            customer: b.name,
            date: b.dateAndTime ? b.dateAndTime.split('T')[0] : '',
            time: b.dateAndTime ? b.dateAndTime.split('T')[1]?.slice(0, 5) : '',
            type: b.purpose === 'tattoo' ? 'Tatuering' : 'Konsultation',
            employee: b.employee,
            email: b.email,
            phone: b.phoneNumber || '',
            duration: `${b.durationInHours} timme(ar)`,
            description: b.description,
            imageUrl: b.imageUrl ? `http://localhost:3000/${b.imageUrl}` : '',
          }));

          setBookings(mappedBookings);
        })
        .catch((err) => {
          console.error('Error fetching bookings:', err);
          setBookings([
            {
              id: '1',
              date: '2024-05-20',
              time: '10:00',
              type: 'Konsultation',
              customer: 'Lisa',
              duration: '1 timme',
              description: 'Drake på armen',
            },
            {
              id: '2',
              date: '2024-05-20',
              time: '13:00',
              type: 'Tatuering',
              customer: 'Markus',
              duration: '2 timmar',
              description: 'Fantasy landskap på ryggen',
            },
          ]);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setBookings([]);
    }
  }, [selectedArtist]);

  // Function to delete a booking
  const handleDeleteBooking = (bookingId) => {
    if (confirm('Är du säker på att du vill ta bort denna bokning?')) {
      setLoading(true);
      fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
        method: 'DELETE',
      })
        .then((res) => {
          if (!res.ok) throw new Error('API error when deleting');
          // Remove the booking from the state
          setBookings(bookings.filter((b) => b.id !== bookingId));
          if (selectedBooking && selectedBooking.id === bookingId) {
            setSelectedBooking(null);
          }
        })
        .catch((err) => {
          console.error('Error deleting booking:', err);
          alert('Kunde inte ta bort bokningen');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

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
        <h2>Tatuerare</h2>
        {loading && <p>Laddar data...</p>}
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
        {selectedBooking && (
          <BookingDetail
            booking={selectedBooking}
            onClose={() => setSelectedBooking(null)}
            onDelete={handleDeleteBooking}
          />
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
