import React from 'react';

const TimePicker = ({
  time,
  tattooTime,
  onTimeChange,
  getAvailableStartTimes,
}) => {
  const availableTimes = getAvailableStartTimes();

  if (!availableTimes || availableTimes.length === 0) return null;

  return (
    <label>
      Starttid för tatuering:
      <select
        name="time"
        value={time}
        onChange={onTimeChange}
        required
        style={{ width: '100%', padding: '0.5rem', marginTop: '0.3rem' }}>
        <option value="">Välj starttid</option>
        {availableTimes.map(({ time: t, isBooked }) => (
          <option
            key={t}
            value={t}
            disabled={isBooked}
            style={isBooked ? { color: 'red' } : {}}>
            {isBooked ? `${t} – Upptagen` : t}
          </option>
        ))}
      </select>
      {tattooTime === '2' && (
        <small style={{ color: 'red' }}>
          Obs: Vissa tider är inte tillgängliga för 2-timmarsbokningar på grund
          av lunch eller stängning.
        </small>
      )}
    </label>
  );
};

export default TimePicker;
