import React from 'react';
import styled from 'styled-components';


const FiltersWrapper = styled.div`
  all: unset;
  background-color: #181512;
  border: 2px solid #d4af37;
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
  }
`;

const StatusFilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const StatusButton = styled.button`
  all: unset;
  background-color: ${({ active }) => (active ? '#d4af37' : '#333')};
  color: ${({ active }) => (active ? '#181512' : '#fff')};
  border: 1px solid #d4af37;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background-color: #d4af37;
    color: #181512;
  }
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const Input = styled.input`
  all: unset;
  background-color: #2a2a2a;
  color: white;
  font-size: 0.9rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid #d4af37;
  border-radius: 6px;
  width: 160px;
`;

const Select = styled.select`
  all: unset;
  background-color: #2a2a2a;
  color: white;
  font-size: 0.9rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid #d4af37;
  border-radius: 6px;
  width: 160px;
`;

const Button = styled.button`
  all: unset;
  background-color: ${({ secondary }) => (secondary ? '#444' : '#d4af37')};
  color: ${({ secondary }) => (secondary ? 'white' : '#181512')};
  font-weight: bold;
  font-size: 0.85rem;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  cursor: pointer;
  text-align: center;

  &:hover {
    opacity: 0.9;
  }
`;

const CountBox = styled.div`
  background-color: #222;
  color: #d4af37;
  padding: 0.4rem 0.9rem;
  border-radius: 10px;
  border: 1px solid #d4af37;
  font-weight: bold;
  font-size: 0.85rem;
  white-space: nowrap;
`;


export default function BookingFilters({
  statusFilter,
  setStatusFilter,
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedArtist,
  setSelectedArtist,
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  sortBy,
  setSortBy,
  onReset,
  total,
  filtered,
  allArtists = [],
}) {
  return (
    <FiltersWrapper>

      {/* 🟡 زرار الحالة: Alla / Idag / Kommande / Tidigare */}
      <StatusFilterRow>
        {[
          { label: 'Alla', value: 'All' },
          { label: 'Idag', value: 'Today' },
          { label: 'Kommande', value: 'Upcoming' },
          { label: 'Tidigare', value: 'Past' },
        ].map(({ label, value }) => (
          <StatusButton
            key={value}
            active={statusFilter === value}
            onClick={() => setStatusFilter(value)}
          >
            {label}
          </StatusButton>
        ))}
      </StatusFilterRow>

      {/* 🟡 شريط الفلترة */}
      <FilterRow>
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

        <Select value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Alla typer</option>
          <option value="Tatuering">Tatuering</option>
          <option value="Konsultation">Konsultation</option>
          <option value="Uppföljning">Uppföljning</option>
        </Select>

        <Select value={selectedArtist} onChange={(e) => setSelectedArtist(e.target.value)}>
          <option value="">Alla tatuerare</option>
          {allArtists.map((artist) => (
            <option key={artist} value={artist}>
              {artist}
            </option>
          ))}
        </Select>

        <Select value={selectedTime} onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Alla tider</option>
          {['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'].map(
            (time) => (
              <option key={time} value={time}>
                {time}
              </option>
            )
          )}
        </Select>

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Ingen sortering</option>
          <option value="time">Sortera efter tid</option>
        </Select>

        <Button onClick={onReset} secondary>Återställ</Button>

        <CountBox>Visar {filtered} / {total}</CountBox>
      </FilterRow>
    </FiltersWrapper>
  );
}
