import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/booking-page.css';
import tattooImage from '../assets/tattoo.jpg';
import Navigation from '../components/NavBar';
import Footer from '../components/Footer';
import SuccessMessage from '../components/booking/SuccessMessage';
import ErrorMessage from '../components/booking/ErrorMessage';
import DateSelector from '../components/booking/DateSelector';
import TimePicker from '../components/booking/TimePicker';

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
  const [fullyBookedDates, setFullyBookedDates] = useState([]);
  const [timeError, setTimeError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchBookings = () => {
    fetch('http://localhost:3000/api/v1/bookings')
      .then((res) => res.json())
      .then((data) => setBookings(data.data))
      .catch((err) => console.error('Kunde inte uppdatera bokningar:', err));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const toUtcIso = (date, time) => {
    const [hour, minute] = time.split(':');
    const local = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      parseInt(hour),
      parseInt(minute)
    );
    return new Date(
      local.getTime() - local.getTimezoneOffset() * 60000
    ).toISOString();
  };

  const getAvailableStartTimes = useCallback(() => {
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

    if (!formData.date || !formData.tattooArtist || !formData.tattooTime)
      return [];

    const selectedArtist = formData.tattooArtist.trim().toLowerCase();
    const selectedDuration = parseInt(formData.tattooTime);

    const filteredTimes =
      selectedDuration === 2
        ? allTimes.filter((t) => t !== '11:00' && t !== '17:00') // förhindra att 2h sträcker sig förbi sista tiden
        : allTimes;

    const available = filteredTimes.map((startTime) => {
      const [hour, minute] = startTime.split(':');
      const localStart = new Date(
        formData.date.getFullYear(),
        formData.date.getMonth(),
        formData.date.getDate(),
        parseInt(hour),
        parseInt(minute)
      );
      const localEnd = new Date(
        localStart.getTime() + selectedDuration * 60 * 60 * 1000
      );

      // Justera till UTC-tid för korrekt jämförelse
      const startUTC = new Date(
        localStart.getTime() - localStart.getTimezoneOffset() * 60000
      );
      const endUTC = new Date(
        localEnd.getTime() - localEnd.getTimezoneOffset() * 60000
      );

      const isBooked = bookings.some((b) => {
        const bookedArtist = b.employee.trim().toLowerCase();
        if (bookedArtist !== selectedArtist) return false;

        const bookingStart = new Date(b.dateAndTime);
        const bookingEnd = new Date(
          bookingStart.getTime() + (b.durationInHours || 1) * 60 * 60 * 1000
        );

        return startUTC < bookingEnd && endUTC > bookingStart;
      });

      return { time: startTime, isBooked };
    });

    console.log('Tillgängliga tider:', available);
    return available;
  }, [bookings, formData.date, formData.tattooArtist, formData.tattooTime]);

  useEffect(() => {
    if (!formData.tattooArtist || bookings.length === 0) return;

    const artist = formData.tattooArtist.trim().toLowerCase();
    const dateMap = {};

    bookings.forEach((b) => {
      const bookedArtist = b.employee.trim().toLowerCase();
      if (bookedArtist !== artist) return;

      const bookedDate = new Date(b.dateAndTime);
      const key = bookedDate.toISOString().split('T')[0];

      if (!dateMap[key]) dateMap[key] = [];
      dateMap[key].push(bookedDate);
    });

    const maxBookingsPerDay = getAvailableStartTimes().length;
    const fullDates = Object.entries(dateMap)
      .filter(([, times]) => times.length >= maxBookingsPerDay)
      .map(([date]) => date);

    setFullyBookedDates(fullDates);
  }, [formData.tattooArtist, bookings, getAvailableStartTimes]);

  const isDayFullyBooked = (date) => {
    const dateStr = date.toISOString().split('T')[0];
    return fullyBookedDates.includes(dateStr);
  };

  const checkTimeAvailability = useCallback(
    (date, time) => {
      if (!time || !formData.tattooArtist) {
        setIsTimeAvailable(false);
        setTimeError('');
        return;
      }

      const selectedUtc = toUtcIso(date, time);

      const isBooked = bookings.some((b) => {
        const bookedArtist = b.employee.trim().toLowerCase();
        return (
          b.dateAndTime === selectedUtc &&
          bookedArtist === formData.tattooArtist.trim().toLowerCase()
        );
      });

      if (isBooked) {
        setIsTimeAvailable(false);
        setTimeError('Tiden är redan bokad. Välj en annan.');
      } else {
        setIsTimeAvailable(true);
        setTimeError('');
      }
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
    setFormData((prev) => ({ ...prev, [name]: value }));
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

  const isWeekend = (date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
  };

  const checkForOverlap = (selectedUtcStart, duration, artist) => {
    const selectedStart = new Date(selectedUtcStart);
    const selectedEnd = new Date(
      selectedStart.getTime() + duration * 60 * 60 * 1000
    );

    return bookings.some((b) => {
      const bookedArtist = b.employee.trim().toLowerCase();
      if (bookedArtist !== artist.toLowerCase()) return false;

      const bookingStart = new Date(b.dateAndTime);
      const bookingEnd = new Date(
        bookingStart.getTime() + (b.durationInHours || 1) * 60 * 60 * 1000
      );

      return selectedStart < bookingEnd && selectedEnd > bookingStart;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const validTimes = getAvailableStartTimes();
    const isValid = validTimes.some(
      (t) => t.time === formData.time && !t.isBooked
    );

    if (!isValid) {
      alert('Ogiltig starttid. Välj en tillgänglig tid från listan.');
      return;
    }

    const selectedUtc = toUtcIso(formData.date, formData.time);
    const selectedArtist = formData.tattooArtist.trim().toLowerCase();

    const overlap = checkForOverlap(
      selectedUtc,
      parseInt(formData.tattooTime),
      selectedArtist
    );
    if (overlap) {
      alert('Den valda tiden överlappar med en annan bokning. Välj en annan.');
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

    const data = new FormData();
    data.append('phoneNumber', formData.phone.trim().replace(/\s+/g, ''));

    data.append('purpose', formData.type);
    data.append('employee', formData.tattooArtist);
    data.append('durationInHours', parseInt(formData.tattooTime));
    data.append('dateAndTime', selectedUtc);
    data.append('name', formData.name);
    data.append('email', formData.email);

    if (formData.additionalInfo.trim()) {
      data.append('description', formData.additionalInfo.trim());
    }

    if (referenceImage) {
      data.append('file', referenceImage);
    }

    try {
      const response = await fetch('http://localhost:3000/api/v1/bookings', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSuccessMessage('Tack! Din bokning har skickats.');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        // Vänta 5 sekunder innan formuläret töms
        setTimeout(() => {
          fetchBookings();
          setFormData({
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
          setReferenceImage(null);
          setIsTimeAvailable(false);
          setTimeError('');
          setSuccessMessage('');
        }, 5000);
      } else {
        alert('Fel vid bokning.');
      }
    } catch {
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
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

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

          <DateSelector
            date={formData.date}
            onDateChange={handleDateChange}
            isDayFullyBooked={isDayFullyBooked}
            showDatepicker={showDatepicker}
            toggleDatepicker={() => setShowDatepicker((prev) => !prev)}
          />

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

          {timeError && <ErrorMessage message={timeError} />}

          <TimePicker
            time={formData.time}
            tattooTime={formData.tattooTime}
            onTimeChange={handleTimeChange}
            getAvailableStartTimes={getAvailableStartTimes}
          />

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
                Telefonnummer:(valfritt)
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
                    }
                  }}
                  style={{ marginTop: '0.3rem' }}
                />
              </label>
              <br />
              <label>
                Övrig information eller önskemål:
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
