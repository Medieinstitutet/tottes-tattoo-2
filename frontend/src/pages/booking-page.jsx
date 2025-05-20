import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/booking-page.css';
import tattooImage from '../assets/tattoo.jpg';
import Navigation from '../components/NavBar';
import Footer from '../components/Footer';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    type: '',
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
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/v1/bookings')
      .then((res) => res.json())
      .then((data) => {
        console.log('📦 Bokningar hämtade:', data.data);
        setBookings(data.data);
      })
      .catch((err) => console.error('Kunde inte hämta bokningar:', err));
  }, []);

  const checkTimeAvailability = useCallback(
    (date, time) => {
      if (!time || !formData.tattooArtist) {
        setIsTimeAvailable(false);
        return;
      }

      const [hour, minute] = time.split(':');
      const selectedDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        parseInt(hour),
        parseInt(minute)
      );

      const selectedArtist = formData.tattooArtist.trim().toLowerCase();

      const isBooked = bookings.some((b) => {
        const booked = new Date(b.dateAndTime);
        const bookedArtist = b.employee.trim().toLowerCase();

        console.log('❗ Bokad:', booked.toISOString(), booked.getTime());
        console.log(
          '❗ Vald:',
          selectedDateTime.toISOString(),
          selectedDateTime.getTime()
        );

        return (
          booked.getTime() === selectedDateTime.getTime() &&
          bookedArtist === selectedArtist
        );
      });

      console.log('✅ Tillgänglig tid?', !isBooked);
      setIsTimeAvailable(!isBooked);
    },
    [formData.tattooArtist, bookings]
  );

  useEffect(() => {
    if (
      formData.date &&
      formData.time &&
      formData.tattooArtist &&
      bookings.length > 0
    ) {
      checkTimeAvailability(formData.date, formData.time);
    }
  }, [
    formData.date,
    formData.time,
    formData.tattooArtist,
    bookings,
    checkTimeAvailability,
  ]);

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

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const handleDateChange = (date) => {
    if (isWeekend(date)) {
      alert('Helger är inte bokningsbara. Välj en vardag.');
      return;
    }
    setFormData((prev) => ({ ...prev, date }));
    checkTimeAvailability(date, formData.time);
    setShowDatepicker(false);
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setFormData((prev) => ({ ...prev, time }));
    checkTimeAvailability(formData.date, time);
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validTimes = getAvailableStartTimes();
    if (!validTimes.includes(formData.time)) {
      alert('Ogiltig starttid. Välj en tillgänglig tid från listan.');
      return;
    }

    if (!isTimeAvailable) {
      alert('Tiden är upptagen. Välj en annan tid.');
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert('Vänligen ange en giltig e-postadress (ex: namn@example.com)');
      return;
    }

    if (!formData.tattooTime) {
      alert('Välj hur lång tid du vill boka.');
      return;
    }

    if (!formData.type) {
      alert('Vänligen välj bokningstyp.');
      return;
    }

    if (!formData.tattooArtist) {
      alert('Vänligen välj en tatuerare.');
      return;
    }

    if (!formData.time) {
      alert('Vänligen välj starttid.');
      return;
    }

    const phoneRegex = /^[\d\s()+-]{7,20}$/;
    if (formData.phone.trim() && !phoneRegex.test(formData.phone.trim())) {
      alert('Vänligen ange ett giltigt telefonnummer.');
      return;
    }

    // ✅ Tidszonskompenserad tid: Skapa lokal tid och konvertera till korrekt UTC
    const [hour, minute] = formData.time.split(':');
    const localDate = new Date(
      formData.date.getFullYear(),
      formData.date.getMonth(),
      formData.date.getDate(),
      parseInt(hour),
      parseInt(minute)
    );

    const utcDate = new Date(
      localDate.getTime() - localDate.getTimezoneOffset() * 60000
    );

    const data = new FormData();
    data.append('phoneNumber', formData.phone.trim());
    data.append('purpose', formData.type);
    data.append('employee', formData.tattooArtist);
    data.append('durationInHours', parseInt(formData.tattooTime));
    data.append('dateAndTime', utcDate.toISOString()); // ✅ Rätt UTC-tid
    data.append('name', formData.name);
    data.append('email', formData.email);

    if (formData.additionalInfo.trim()) {
      data.append('description', formData.additionalInfo.trim());
    }

    if (referenceImage) {
      data.append('file', referenceImage);
    }

    console.log('DATA SOM SKICKAS TILL BACKEND:');
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
              value={formData.date.toLocaleDateString('sv-SE')}
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
                Telefonnummer:
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
