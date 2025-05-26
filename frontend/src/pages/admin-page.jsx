import React, { useEffect, useState } from 'react';
import Navigation from '../components/NavBar';
import Footer from '../components/Footer';
import styled from 'styled-components';
import BookingCard from '../components/admin/BookingCard';
import BookingFilters from '../components/admin/BookingFilters';
import EditBookingModal from '../components/admin/EditBookingModal';
import '../styles/admin-page.css';
import adminBg from '../assets/admin_bg.jpg';

const Wrapper = styled.div`
  min-height: 80vh;
  font-family: 'Roboto', 'Georgia', Arial, sans-serif;
  color: white;
  background: #181512;
  padding: 2rem;
  padding-top: 7rem;
  background-image: url(${adminBg});
  background-size: cover;
  background-position: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
`;
const HeaderBox = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid #d4af37;
  border-radius: 12px;
  padding: 1rem 2rem;
  text-align: center;
  margin-bottom: 2rem;
  box-shadow: 0 4px 10px #00000066;
`;

const Title = styled.h2`
  color: #d4af37;
  font-size: 2rem;
  font-weight: bold;
  text-shadow: 1px 1px 2px #000;
  margin: 0;
`;

const API_BASE_URL = 'http://localhost:3000/api/v1';
const ADMIN_USERNAME = 'employee';
const ADMIN_PASSWORD = 'password123';

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [bookings, setBookings] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [loading, setLoading] = useState(false);
  const [editBooking, setEditBooking] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setLoggedIn(true);
      setError('');
    } else {
      setError('Fel användarnamn eller lösenord');
    }
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('');
    setSelectedArtist('');
    setSelectedDate('');
    setSelectedTime('');
    setSortBy('');
    setStatusFilter('All');
  };

  const handleDeleteBooking = (bookingId) => {
    if (confirm('Är du säker på att du vill ta bort denna bokning?')) {
      setLoading(true);
      fetch(`${API_BASE_URL}/bookings/${bookingId}`, { method: 'DELETE' })
        .then((res) => {
          if (!res.ok) throw new Error('API error');
          setBookings((prev) => prev.filter((b) => b.id !== bookingId));
        })
        .catch((err) => {
          console.error('Error deleting:', err);
          alert('Kunde inte ta bort bokningen');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleSaveEdit = (updatedBooking) => {
    const { date, time, duration, employee, type } = updatedBooking;

    const [hour, minute] = time.split(':').map(Number);
    const localDate = new Date(date);
    localDate.setHours(hour, minute, 0, 0);
    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    const internalPurpose = type.toLowerCase().includes('tat')
      ? 'tattoo'
      : 'consultation';

    const updatedData = {
      name: updatedBooking.customer,
      email: updatedBooking.email,
      phoneNumber: updatedBooking.phone,
      purpose: internalPurpose,
      dateAndTime: utcDate.toISOString(),
      employee: employee.trim(),
      description: updatedBooking.description,
      durationInHours: parseInt(duration),
    };

    setLoading(true);
    fetch(`${API_BASE_URL}/bookings/${updatedBooking.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update booking');
        setBookings((prev) =>
          prev.map((b) =>
            b.id === updatedBooking.id ? { ...updatedBooking } : b
          )
        );
        setEditBooking(null);
      })
      .catch((err) => {
        console.error('Error updating booking:', err);
        alert('Kunde inte uppdatera bokningen');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      setLoading(true);
      fetch(`${API_BASE_URL}/bookings`)
        .then((res) => res.json())
        .then((result) => {
          const bookingsArray = Array.isArray(result.data) ? result.data : [];

          const mapped = bookingsArray.map((b) => ({
            id: b._id,
            customer: b.name,
            date: b.dateAndTime ? b.dateAndTime.split('T')[0] : '',
            time: b.dateAndTime
              ? b.dateAndTime.split('T')[1]?.substring(0, 5)
              : '',
            type: b.purpose === 'tattoo' ? 'Tatuering' : 'Konsultation',
            employee:
              b.employee === 'Totte'
                ? 'Totte Lindström'
                : b.employee === 'Amanda'
                ? 'Amanda Berg'
                : b.employee === 'Anders'
                ? 'Anders Lindström'
                : b.employee.toLowerCase() === 'marcus'
                ? 'Marcus Diaz'
                : b.employee,
            email: b.email,
            phone: b.phoneNumber || '',
            duration: `${b.durationInHours}`,
            description: b.description,
            referenceImage: b.referenceImage || b.imageUrl || '',
          }));

          setBookings(mapped);
        })
        .catch((err) => {
          console.error('Error fetching bookings:', err);
          setBookings([]);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [loggedIn]);

  const filteredBookings = bookings
    .filter((b) => {
      const query = searchQuery.toLowerCase();
      const matchSearch =
        b.customer.toLowerCase().includes(query) ||
        b.email.toLowerCase().includes(query) ||
        b.phone.includes(query);

      const matchType = selectedType ? b.type === selectedType : true;
      const matchArtist = selectedArtist ? b.employee === selectedArtist : true;
      const matchDate = selectedDate ? b.date === selectedDate : true;
      const matchTime = selectedTime ? b.time === selectedTime : true;

      const today = new Date().toISOString().split('T')[0];
      const matchStatus =
        statusFilter === 'All'
          ? true
          : statusFilter === 'Today'
          ? b.date === today
          : statusFilter === 'Upcoming'
          ? b.date > today
          : statusFilter === 'Past'
          ? b.date < today
          : true;

      return (
        matchSearch &&
        matchType &&
        matchArtist &&
        matchDate &&
        matchTime &&
        matchStatus
      );
    })
    .sort((a, b) => {
      if (sortBy === 'time') {
        return a.time.localeCompare(b.time);
      }
      return 0;
    });

  const uniqueArtists = Array.from(
    new Set([
      ...bookings.map((b) => b.employee),
      'Totte Lindström',
      'Anders Lindström',
      'Amanda Berg',
      'Marcus Diaz',
      'Erik Sandberg',
    ])
  ).filter(Boolean);

  if (!loggedIn) {
    return (
      <>
        <Navigation />
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
          }}>
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
              type="text"
              placeholder="Användarnamn"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Lösenord"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Logga in</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <Wrapper>
        <HeaderBox>
          <Title>Admin Bokningar</Title>
        </HeaderBox>

        <div style={{ marginBottom: '2rem' }}>
          <BookingFilters
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedArtist={selectedArtist}
            setSelectedArtist={setSelectedArtist}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={resetFilters}
            total={bookings.length}
            filtered={filteredBookings.length}
            allArtists={uniqueArtists}
          />
        </div>

        {loading ? (
          <p>Laddar bokningar...</p>
        ) : filteredBookings.length === 0 ? (
          <p style={{ color: '#d4af37', fontWeight: 'bold' }}>
            {selectedArtist
              ? `Inga bokningar hittades för ${selectedArtist}`
              : 'Inga bokningar hittades'}
          </p>
        ) : (
          <Grid>
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onDelete={handleDeleteBooking}
                onEdit={setEditBooking}
              />
            ))}
          </Grid>
        )}
      </Wrapper>

      {editBooking && (
        <EditBookingModal
          booking={editBooking}
          onClose={() => setEditBooking(null)}
          onSave={handleSaveEdit}
          allArtists={uniqueArtists}
          bookings={bookings}
        />
      )}

      <Footer />
    </>
  );
}
