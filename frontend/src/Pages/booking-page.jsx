import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/booking-page.css';
import tattooImage from '../assets/tattoo.jpg';
import Navigation from '../Components/NavBar';
import Footer from '../Components/Footer';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    type: '', // ← tidigare "bookingType"
    date: new Date(),
    time: '',
    tattooArtist: '',
    tattooTime: '',
    name: '',
    email: '',
    phone: '',
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
    setIsTimeAvailable(Boolean(time));
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      alert('Vänligen ange en giltig e-postadress (ex: namn@example.com)');
      return;
    }

    if (!formData.tattooTime) {
      alert('Välj hur lång tid du vill boka.');
      return;
    }

    const data = new FormData();

    data.append('type', formData.type); // ← viktig ändring
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('date', formData.date.toISOString().split('T')[0]);
    data.append('time', formData.time);
    data.append('duration', parseInt(formData.tattooTime) * 60);
    data.append('artist', formData.tattooArtist);

    if (formData.phone.trim()) {
      data.append('phone', formData.phone.trim());
    }

    if (formData.additionalInfo.trim()) {
      data.append('additionalInfo', formData.additionalInfo.trim());
    }

    if (referenceImage) {
      data.append('file', referenceImage);
    }

    console.log('🟡 DATA SOM SKICKAS TILL BACKEND:');
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/bookings', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ Bokningen lyckades:', result);
        alert('Tack! Din bokning har skickats.');
      } else {
        const err = await response.json();
        console.error('❌ Fel vid bokning:', err);
        alert('Fel: ' + err.message);
      }
    } catch (err) {
      console.error('🔥 Fetch-fel:', err);
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
          encType="multipart/form-data"
          style={{
            width: '100%',
            maxWidth: '500px',
            marginTop: '2rem !important',
          }}>
          <label>
            Jag vill boka:
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.3rem',
              }}>
              <option value="">-- Välj ett alternativ --</option>
              <option value="tattoo">Tatuering</option>
              <option value="consultation">Konsultation</option>
            </select>
          </label>

          <br />

          <label>
            Välj datum:
            <input
              type="text"
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
            Välj tatuerare:
            <select
              name="tattooArtist"
              value={formData.tattooArtist}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '0.5rem',
                marginTop: '0.3rem',
              }}>
              <option value="">Välj en tatuerare</option>
              <option value="Totte">Totte</option>
              <option value="Erik">Erik</option>
              <option value="Marcus">Marcus</option>
              <option value="Anders">Anders</option>
              <option value="Amanda">Amanda</option>
            </select>
          </label>

          <br />

          <label>
            Välj tid för tatuering:
            <select
              name="tattooTime"
              value={formData.tattooTime}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}>
              <option value="">Välj tid</option>
              <option value="1">1 timme</option>
              <option value="2">2 timmar</option>
            </select>
          </label>

          <br />

          <label>
            Starttid för tatuering:
            <select
              name="time"
              value={formData.time}
              onChange={handleTimeChange}
              required
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}>
              <option value="">Välj starttid</option>
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
                  type="text"
                  name="name"
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
                  type="email"
                  name="email"
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
                Telefonnummer (valfritt):
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
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
                  type="file"
                  name="referenceImage"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setReferenceImage(file);
                      console.log('Bifogad bild:', file);
                    }
                  }}
                  style={{ marginTop: '0.3rem' }}
                />
              </label>
              <br />
              <label>
                Övrig information:
                <textarea
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    marginTop: '0.3rem',
                  }}
                />
              </label>
            </>
          )}

          <button
            type="submit"
            disabled={!isTimeAvailable}
            style={{
              backgroundColor: '#d4af37',
              color: '#181716',
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
      <Footer />
    </>
  );
};

export default BookingPage;
