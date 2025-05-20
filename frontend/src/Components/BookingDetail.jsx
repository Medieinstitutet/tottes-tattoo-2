import React from 'react';
import styled from 'styled-components';

const DetailContainer = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gold};
  padding: 1.5rem;
  margin-top: 1.5rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 5px;
`;

const DetailTitle = styled.h3`
  color: ${({ theme }) => theme.colors.gold};
  margin-bottom: 1rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gold};
  padding-bottom: 0.5rem;
`;

const DetailField = styled.p`
  margin: 0.5rem 0;
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gold};
  margin-right: 0.5rem;
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const Button = styled.button`
  background-color: ${(props) =>
    props.danger ? '#a51515' : props.theme.colors.gold};
  color: ${(props) => (props.danger ? 'white' : props.theme.colors.background)};
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;

  &:hover {
    opacity: 0.9;
  }
`;

export default function BookingDetail({ booking, onClose, onDelete }) {
  if (!booking) return null;

  return (
    <DetailContainer>
      <DetailTitle>Bokningsdetaljer</DetailTitle>

      <DetailField>
        <Label>Typ av bokning</Label>
        {booking.type}
      </DetailField>

      <DetailField>
        <Label>Kund</Label>
        {booking.customer}
      </DetailField>

      <DetailField>
        <Label>Datum och tid</Label>
        {booking.date} {booking.time}
      </DetailField>

      <DetailField>
        <Label>Längd</Label>
        {booking.duration}
      </DetailField>

      <DetailField>
        <Label>Tatuerare</Label>
        {booking.employee}
      </DetailField>

      <DetailField>
        <Label>Kontaktuppgifter</Label>
        {booking.email}
        {booking.phone && <span>Tel: {booking.phone}</span>}
      </DetailField>

      {booking.description && (
        <DetailField>
          <Label>Beskrivning</Label>
          {booking.description}
        </DetailField>
      )}

      {booking.imageUrl && (
        <DetailField>
          <Label>Bifogad bild</Label>
          <a href={booking.imageUrl} target='_blank' rel='noopener noreferrer'>
            Visa bild
          </a>
        </DetailField>
      )}

      <ButtonRow>
        <Button onClick={onClose}>Stäng</Button>
        {onDelete && (
          <Button danger onClick={() => onDelete(booking.id)}>
            Ta bort bokning
          </Button>
        )}
      </ButtonRow>
    </DetailContainer>
  );
}
