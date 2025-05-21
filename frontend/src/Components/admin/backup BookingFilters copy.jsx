import React from 'react';
import styled from 'styled-components';

const FiltersWrapper = styled.div`
  background-color: #181512;
  border: 2px solid #d4af37;
  padding: 1rem;
  border-radius: 12px;
  margin: 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;

  @media (min-width: 768px) {
    justify-content: space-between;
  }
`;

const Input = styled.input`
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  border: none;
  font-size: 0.95rem;
  background: #2a2a2a;
  color: #fff;
  min-width: 160px;
  flex: 1 1 auto;
  max-width: 200px;

  &::placeholder {
    color: #aaa;
  }
`;

const Select = styled.select`
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  border: none;
  font-size: 0.95rem;
  background: #2a2a2a;
  color: #fff;
  min-width: 140px;
  flex: 1 1 auto;
  max-width: 180px;
`;

const Button = styled.button`
  background-color: ${({ secondary }) => (secondary ? '#444' : '#d4af37')};
  color: ${({ secondary }) => (secondary ? '#fff' : '#181512')};
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  white-space: nowrap;
  flex: 0 0 auto;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);
    opacity: 0.9;
  }
`;

const CountBox = styled.div`
  background-color: #222;
  color: #d4af37;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  border: 1px solid #d4af37;
  font-weight: bold;
  font-size: 0.85rem;
  flex: 0 0 auto;
`;

export default function BookingFilters({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedArtist,
  setSelectedArtist,
  selectedDate,
  setSelectedDate,
  onReset,
  goToToday,
  total,
  filtered,
  allArtists = [],
}) {
  return (
    <FiltersWrapper>
      <Input
        type="text"
        placeholder="Sök kund, mail..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <Input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <Select
        value={selectedType}
        onChange={(e) => setSelectedType(e.target.value)}
      >
        <option value="">Alla typer</option>
        <option value="Tatuering">Tatuering</option>
        <option value="Konsultation">Konsultation</option>
        <option value="Uppföljning">Uppföljning</option>
      </Select>

      <Select
        value={selectedArtist}
        onChange={(e) => setSelectedArtist(e.target.value)}
      >
        <option value="">Alla tatuerare</option>
        {allArtists.map((artist) => (
          <option key={artist} value={artist}>
            {artist}
          </option>
        ))}
      </Select>

      <Button onClick={goToToday}>Idag</Button>
      <Button onClick={onReset} secondary>Återställ</Button>

      <CountBox>
        Visar {filtered} / {total}
      </CountBox>
    </FiltersWrapper>
  );
}
