import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background-color: ${({ bgColor }) => bgColor || '#181512'};
  border: 2px solid #d4af37;
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
  box-shadow: 0 4px 12px #0006;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  position: relative;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.015);
    box-shadow: 0 0 10px #d4af37aa;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.95rem;
`;

const Label = styled.span`
  font-weight: bold;
  color: #d4af37;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 0.7rem;
`;

const ActionButton = styled.button`
  background-color: ${({ danger }) => (danger ? '#a51515' : '#d4af37')};
  color: ${({ danger }) => (danger ? 'white' : '#181512')};
  border: none;
  padding: 0.4rem 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const OldTag = styled.div`
  position: absolute;
  top: -12px;
  right: -12px;
  background-color: #b53232;
  color: white;
  font-size: 0.75rem;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 10px;
  box-shadow: 0 0 4px #000;
`;

const getColorByType = (type) => {
  switch (type) {
    case 'Konsultation':
      return '#3a3000';
    case 'Tatuering':
      return '#3d1212';
    case 'Uppföljning':
      return '#0f2e4d';
    default:
      return '#222';
  }
};

const isPastDate = (date) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const bookingDate = new Date(date).setHours(0, 0, 0, 0);
  return bookingDate < today;
};

export default function BookingCard({ booking, onDelete, onEdit }) {
  const bgColor = getColorByType(booking.type);
  const isOld = isPastDate(booking.date);

  const fullImageURL = booking.referenceImage?.startsWith('uploads/')
    ? `http://localhost:3000/${booking.referenceImage}`
    : booking.referenceImage;

  return (
    <Card bgColor={bgColor}>
      {isOld && <OldTag>⏳ Tidigare</OldTag>}

      <Field>
        <Label>Kund:</Label> {booking.customer}
      </Field>
      <Field>
        <Label>Typ av bokning:</Label> {booking.type}
      </Field>
      <Field>
        <Label>Datum & tid:</Label> {booking.date} – {booking.time}
      </Field>
      <Field>
        <Label>Tatuerare:</Label> {booking.employee}
      </Field>
      <Field>
        <Label>Email:</Label> {booking.email}
      </Field>

      {booking.phone && (
        <Field>
          <Label>Telefon:</Label> {booking.phone}
        </Field>
      )}
      <Field>
        <Label>Längd:</Label> {booking.duration}
      </Field>
      {booking.description && (
        <Field>
          <Label>Beskrivning:</Label> {booking.description}
        </Field>
      )}

      {booking.referenceImage &&
        /\.(jpg|jpeg|png)$/i.test(booking.referenceImage) && (
          <Field>
            <Label>Referensbild:</Label>
            <div
              style={{
                marginTop: '0.4rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.3rem',
              }}>
              <a
                href={fullImageURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: '0.85rem',
                  color: '#d4af37',
                  textDecoration: 'underline',
                }}>
                Öppna i nytt fönster
              </a>
              <a
                href={fullImageURL}
                download={
                  booking.referenceImage.split('/').pop() || 'referensbild.jpg'
                }
                style={{
                  fontSize: '0.85rem',
                  color: '#d4af37',
                  textDecoration: 'underline',
                }}>
                Ladda ner
              </a>
            </div>
          </Field>
        )}

      <ButtonRow>
        <ActionButton onClick={() => onEdit(booking)}>Redigera</ActionButton>
        <ActionButton danger onClick={() => onDelete(booking.id)}>
          Ta bort
        </ActionButton>
      </ButtonRow>
    </Card>
  );
}
