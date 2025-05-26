import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: start;
  padding: 2rem 1rem;
  overflow-y: auto;
  z-index: 999;
`;
const CloseButton = styled.button`
  all: unset;
  position: absolute;
  top: 0.7rem;
  right: 0.7rem;
  background-color: #d4af37;
  color: #181512;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  cursor: pointer;
  line-height: 1;

  &:hover {
    opacity: 0.85;
    transform: scale(1.05);
  }
`;
const ModalBox = styled.div`
  position: relative;
  background: #181512;
  border: 2px solid #d4af37;
  padding: 2rem;
  border-radius: 12px;
  max-width: 500px;
  width: 100%;
  color: white;
  box-shadow: 0 0 20px #0008;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 480px) {
    padding: 1.2rem;
    gap: 0.8rem;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: bold;
  color: #d4af37;
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
`;

const Textarea = styled.textarea`
  padding: 0.5rem;
  border-radius: 6px;
  border: none;
  resize: vertical;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  background-color: ${({ danger }) => (danger ? '#a51515' : '#d4af37')};
  color: ${({ danger }) => (danger ? 'white' : '#181512')};
  border: none;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const Warning = styled.div`
  color: #ff4d4d;
  font-weight: bold;
  margin-top: -0.5rem;
`;

export default function EditBookingModal({
  booking,
  onClose,
  onSave,
  allArtists = [],
  bookings = [],
}) {
  const [formData, setFormData] = useState({ ...booking });
  const [overlapWarning, setOverlapWarning] = useState(false);

  useEffect(() => {
    const normalizeEmployee = (fullName) => {
      const match = fullName.match(/Totte|Amanda|Anders|Marcus|Erik/);
      return match ? match[0] : fullName;
    };

    setFormData({
      ...booking,
      employee: normalizeEmployee(booking.employee),
    });
  }, [booking]);

  useEffect(() => {
    const checkOverlap = () => {
      const { date, time, duration, employee } = formData;
      if (!date || !time || !duration || !employee) return;

      const [hour, minute] = time.split(':').map(Number);
      const localDate = new Date(date);
      localDate.setHours(hour, minute, 0, 0);
      const utcStart = new Date(
        localDate.getTime() - localDate.getTimezoneOffset() * 60000
      );
      const utcEnd = new Date(
        utcStart.getTime() + parseInt(duration) * 60 * 60 * 1000
      );

      const selectedArtist = employee.trim().toLowerCase();

      const overlap = bookings.some((b) => {
        if (b.id === booking.id) return false;

        const fullName = b.employee.trim();
        const match = fullName.match(/Totte|Amanda|Anders|Marcus|Erik/);
        const bookedArtist = match
          ? match[0].toLowerCase()
          : fullName.toLowerCase();
        if (bookedArtist !== selectedArtist) return false;

        const [bh, bm] = (b.time || '00:00').split(':').map(Number);
        const local = new Date(b.date);
        local.setHours(bh, bm, 0, 0);
        const bookingStart = new Date(
          local.getTime() - local.getTimezoneOffset() * 60000
        );
        const bookingEnd = new Date(
          bookingStart.getTime() +
            (b.durationInHours || parseInt(b.duration) || 1) * 60 * 60 * 1000
        );

        return utcStart < bookingEnd && utcEnd > bookingStart;
      });

      console.log('=== DEBUG BOOKINGS ===');
      console.log('formData:', formData);
      console.log('bookings:', bookings);

      setOverlapWarning(overlap);
    };

    checkOverlap();
  }, [formData, bookings, booking.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let adjustedValue = value;
    if (name === 'employee') {
      const match = value.match(/Totte|Amanda|Anders|Marcus|Erik/);
      if (match) adjustedValue = match[0];
    }

    setFormData((prev) => ({ ...prev, [name]: adjustedValue }));
  };

  const handleSubmit = () => {
    if (!overlapWarning) {
      console.log('Sparar bokning:', formData);
      onSave(formData);
    } else {
      alert(
        '❗ Den valda tiden krockar med en annan bokning. Välj en annan tid.'
      );
    }
  };

  return (
    <Overlay>
      <ModalBox>
        <CloseButton onClick={onClose}>×</CloseButton>

        <h3>Redigera Bokning</h3>

        <Field>
          <Label>Kundnamn</Label>
          <Input
            name="customer"
            value={formData.customer}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <Label>Datum</Label>
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <Label>Tid</Label>
          <Input name="time" value={formData.time} onChange={handleChange} />
          {overlapWarning && <Warning>❗ Tiden är redan bokad!</Warning>}
        </Field>

        <Field>
          <Label>Typ av bokning</Label>
          <Select name="type" value={formData.type} onChange={handleChange}>
            <option value="Tatuering">Tatuering</option>
            <option value="Konsultation">Konsultation</option>
            <option value="Uppföljning">Uppföljning</option>
          </Select>
        </Field>

        <Field>
          <Label>Tatuerare</Label>
          <Select
            name="employee"
            value={formData.employee}
            onChange={handleChange}>
            {allArtists.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </Select>
        </Field>

        <Field>
          <Label>Email</Label>
          <Input name="email" value={formData.email} onChange={handleChange} />
        </Field>

        <Field>
          <Label>Telefon</Label>
          <Input name="phone" value={formData.phone} onChange={handleChange} />
        </Field>

        <Field>
          <Label>Längd</Label>
          <Input
            name="duration"
            value={formData.duration}
            onChange={handleChange}
          />
        </Field>

        <Field>
          <Label>Beskrivning</Label>
          <Textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </Field>

        <ButtonRow>
          <Button onClick={handleSubmit} disabled={overlapWarning}>
            Spara
          </Button>
          <Button danger onClick={onClose}>
            Avbryt
          </Button>
        </ButtonRow>
      </ModalBox>
    </Overlay>
  );
}
