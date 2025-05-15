import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/booking-page.css';
import tattooImage from '../assets/tattoo.jpg';

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
    <main
      style={{
        backgroundImage: `url(${tattooImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}>
      <h1>Boka tid hos Tottes Tattoo</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Välj datum:
          <input
            type="text"
            readOnly
            value={formData.date.toISOString().split('T')[0]}
            onClick={() => setShowDatepicker(!showDatepicker)}
            style={{ cursor: 'pointer' }}
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
            name="tattooTime"
            value={formData.tattooTime}
            onChange={handleChange}
            required>
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
            required>
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
              />
            </label>
            <br />
            <label>
              Tatueringsstil:
              <select
                name="tattooStyle"
                value={formData.tattooStyle}
                onChange={handleChange}
                required>
                <option value="">Välj en stil</option>
                <option value="Old School">Old School (Traditional)</option>
                <option value="New School">New School</option>
                <option value="Realism">Realism</option>
                <option value="Black & Grey">Black & Grey</option>
                <option value="Dotwork">Dotwork</option>
                <option value="Linework">Linework</option>
                <option value="Watercolor">Watercolor</option>
                <option value="Geometric">Geometrisk</option>
                <option value="Tribal">Tribal</option>
                <option value="Japanese">Japansk (Irezumi)</option>
                <option value="Chicano">Chicano</option>
                <option value="Neo Traditional">Neo Traditional</option>
                <option value="Minimalistisk">Minimalistisk</option>
                <option value="Sketch">Sketch/Illustrativ</option>
                <option value="Trash Polka">Trash Polka</option>
                <option value="Fineline">Fineline</option>
                <option value="Surrealism">Surrealism</option>
                <option value="Biomekanisk">Biomekanisk</option>
                <option value="Celtic">Keltisk</option>
                <option value="Ignorant Style">Ignorant Style</option>
              </select>
            </label>

            <br />
            <label>
              Övrig information:
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
              />
            </label>
            <br />

            <label>
              Bifoga referensbild (valfritt):
              <input
                type="file"
                name="referenceImage"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
          </>
        )}

        <button type="submit" disabled={!isTimeAvailable}>
          Skicka bokning
        </button>
      </form>
    </main>
  );
};

export default BookingPage;
