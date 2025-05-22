import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DateSelector = ({
  date,
  onDateChange,
  isDayFullyBooked,
  showDatepicker,
  toggleDatepicker,
}) => {
  return (
    <>
      <label>
        Välj datum:
        <input
          type="text"
          readOnly
          value={date.toLocaleDateString('sv-SE')}
          onClick={toggleDatepicker}
          style={{
            cursor: 'pointer',
            width: '100%',
            padding: '0.5rem',
            marginTop: '0.3rem',
          }}
        />
      </label>

      {showDatepicker && (
        <DatePicker
          selected={date}
          onChange={onDateChange}
          inline
          dayClassName={(d) =>
            isDayFullyBooked(d) ? 'fully-booked-day' : undefined
          }
        />
      )}
    </>
  );
};

export default DateSelector;
