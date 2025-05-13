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
    name: '',
    email: '',
    tattooStyle: '',
    additionalInfo: '',
  });
  const [isTimeAvailable, setIsTimeAvailable] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({
      ...prev,
      date: date,
    }));
    checkTimeAvailability(date); // Kolla om tiden är ledig när datum ändras
  };

  const handleTimeChange = (e) => {
    const time = e.target.value;
    setFormData((prev) => ({
      ...prev,
      time: time,
    }));
    checkTimeAvailability(formData.date, time); // Kolla om tiden är ledig när tid ändras
  };

  const checkTimeAvailability = (date, time) => {
    if (time) {
      setIsTimeAvailable(true);
    } else {
      setIsTimeAvailable(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Bokningsdata:', formData);
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
          <DatePicker
            selected={formData.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            required
          />
        </label>
        <br />

        <label>
          Välj tid:
          <select
            name="time"
            value={formData.time}
            onChange={handleTimeChange}
            required>
            <option value="">Välj tid</option>
            <option value="09:00">09:00</option>
            <option value="10:00">10:00</option>
            <option value="11:00">11:00</option>
            <option value="13:00">13:00</option>
            <option value="14:00">14:00</option>
            <option value="15:00">15:00</option>
          </select>
        </label>
        <br />

        <label>
          Välj tatuerare:
          <select
            name="tattooArtist"
            value={formData.tattooArtist}
            onChange={handleChange}
            required>
            <option value="">Välj tatuerare</option>
            <option value="Totte">Totte</option>
            <option value="Niklas">Niklas</option>
            <option value="Rita">Rita</option>
            <option value="Lotiz">Lotiz</option>
            <option value="Zoher">Zoher</option>
          </select>
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
              <input
                type="text"
                name="tattooStyle"
                value={formData.tattooStyle}
                onChange={handleChange}
                required
              />
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
