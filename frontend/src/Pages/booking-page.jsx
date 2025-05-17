import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/booking-page.css';
import tattooImage from '../assets/tattoo.jpg';
import Navigation from '../Components/NavBar';
import Footer from '../Components/Footer';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    date: new Date(),
    time: '',
    tattooArtist: '',
    tattooTime: '',
    name: '',
    email: '',
    tattooStyle: '',
    additionalInfo: '',
  });

  const [referenceImage, setReferenceImage] = useState(null);
  const [isTimeAvailable, setIsTimeAvailable] = useState(false);
  const [showDatepicker, setShowDatepicker] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getAvailableStartTimes = () => {
    const allTimes = [
      '09:00',
      '10:00',
      '11:00',
      '13:00',
      '14:00',
      '15:00',
      '16:00',
      '17:00',
    ];

    if (formData.tattooTime === '2') {
      return allTimes.filter((time) => time !== '11:00' && time !== '17:00');
    }

    return allTimes;
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
    checkTimeAvailability(date);
    setShowDatepicker(false);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setFormData((prev) => ({
      ...prev,
      time: time,
    }));
    checkTimeAvailability(formData.date, time);
  };

  const checkTimeAvailability = (date, time) => {
    if (time) {
      setIsTimeAvailable(true);
    } else {
      setIsTimeAvailable(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setReferenceImage(file);
      console.log('Bifogad bild:', file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('date', formData.date.toISOString());
    data.append('time', formData.time);
    data.append('tattooTime', formData.tattooTime);
    data.append('tattooStyle', formData.tattooStyle);
    data.append('additionalInfo', formData.additionalInfo);

    if (referenceImage) {
      data.append('file', referenceImage);
    }

    try {
      const response = await fetch('http://localhost:5000/bookings', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Bokningen lyckades:', result);
        alert('Tack! Din bokning har skickats.');
      } else {
        console.error('Fel vid bokning:', response.statusText);
        alert('Något gick fel. Försök igen.');
      }
    } catch (err) {
      console.error('Fetch-fel:', err);
      alert('Kunde inte skicka bokningen.');
    }
  };

  return (
    <>
      <Navigation />
      <main
        style={{
          backgroundImage: `url(${tattooImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '0 2rem',
          fontFamily: "'Georgia', serif",
          color: '#f1f1f1',
          textShadow: '2px 2px 10px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <form
          onSubmit={handleSubmit}
          style={{
            width: '100%',
            maxWidth: '500px',
            marginTop: '2rem !important',
          }}>
          <label>
            Välj datum:
            <input
              type='text'
              readOnly
              value={formData.date.toISOString().split('T')[0]}
              onClick={() => setShowDatepicker(!showDatepicker)}
              style={{
                cursor: 'pointer',
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.3rem',
              }}
            />
          </label>

          {showDatepicker && (
            <div style={{ marginBottom: '1rem' }}>
              <DatePicker
                selected={formData.date}
                onChange={handleDateChange}
                inline
              />
            </div>
          )}

          <br />

          <label>
            Välj tid för tatuering:
            <select
              name='tattooTime'
              value={formData.tattooTime}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}>
              <option value=''>Välj tid</option>
              <option value='1'>1 timme</option>
              <option value='2'>2 timmar</option>
            </select>
          </label>

          <br />

          <label>
            Starttid för tatuering:
            <select
              name='time'
              value={formData.time}
              onChange={handleTimeChange}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}>
              <option value=''>Välj starttid</option>
              {getAvailableStartTimes().map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            {formData.tattooTime === '2' && (
              <small style={{ color: 'red' }}>
                Obs: Vissa tider är inte tillgängliga för 2-timmarsbokningar på
                grund av lunch eller stängning.
              </small>
            )}
          </label>

          <br />

          {isTimeAvailable && (
            <>
              <label>
                Namn:
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.3rem',
                  }}
                />
              </label>
              <br />
              <label>
                E-post:
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.3rem',
                  }}
                />
              </label>
              <br />
              <label>
                Tatueringsstil:
                <select
                  name='tattooStyle'
                  value={formData.tattooStyle}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.3rem',
                  }}>
                  <option value=''>Välj en stil</option>
                  <option value='Old School'>Old School (Traditional)</option>
                  <option value='New School'>New School</option>
                  <option value='Realism'>Realism</option>
                  <option value='Black & Grey'>Black & Grey</option>
                  <option value='Dotwork'>Dotwork</option>
                  <option value='Linework'>Linework</option>
                  <option value='Watercolor'>Watercolor</option>
                  <option value='Geometric'>Geometrisk</option>
                  <option value='Tribal'>Tribal</option>
                  <option value='Japanese'>Japansk (Irezumi)</option>
                  <option value='Chicano'>Chicano</option>
                  <option value='Neo Traditional'>Neo Traditional</option>
                  <option value='Minimalistisk'>Minimalistisk</option>
                  <option value='Sketch'>Sketch/Illustrativ</option>
                  <option value='Trash Polka'>Trash Polka</option>
                  <option value='Fineline'>Fineline</option>
                  <option value='Surrealism'>Surrealism</option>
                  <option value='Biomekanisk'>Biomekanisk</option>
                  <option value='Celtic'>Keltisk</option>
                  <option value='Ignorant Style'>Ignorant Style</option>
                </select>
              </label>

              <br />
              <label>
                Övrig information:
                <textarea
                  name='additionalInfo'
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.3rem',
                  }}
                />
              </label>
              <br />

              <label>
                Bifoga referensbild (valfritt):
                <input
                  type='file'
                  name='referenceImage'
                  accept='image/*'
                  onChange={handleImageUpload}
                  style={{ marginTop: '0.3rem' }}
                />
              </label>
            </>
          )}

          <button
            type='submit'
            disabled={!isTimeAvailable}
            style={{
              backgroundColor: '#d4af37', // matchar gold i temat
              color: '#181716', // matchar background i temat
              border: 'none',
              padding: '1rem 2.5rem',
              fontWeight: 'bold',
              fontSize: '1.1rem',
              cursor: 'pointer',
              borderRadius: '5px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'background-color 0.2s',
              marginTop: '1rem',
              width: '100%',
              maxWidth: '500px',
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.backgroundColor = '#ffd700')
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.backgroundColor = '#d4af37')
            }>
            Skicka bokning
          </button>
        </form>
      </main>

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
};

export default BookingPage;
