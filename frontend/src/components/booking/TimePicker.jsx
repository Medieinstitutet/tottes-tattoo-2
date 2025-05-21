import React from 'react';

const TimePicker = ({
  time,
  tattooTime,
  onTimeChange,
  getAvailableStartTimes,
}) => {
  const availableTimes = getAvailableStartTimes();

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
        {availableTimes.map((t) => (
          <option key={t} value={t}>
            {t}
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
