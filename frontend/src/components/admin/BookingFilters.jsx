import React, { useState, useRef, useEffect } from 'react';
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
    display: none;
  }
`;

const StatusFilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const FilterRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  justify-content: space-between;
  align-items: center;
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
  appearance: none;
  background-color: #2a2a2a;
  color: white;
  font-size: 0.9rem;
  padding: 0.5rem 0.7rem;
  border: 1px solid #d4af37;
  border-radius: 6px;
  width: 160px;

  position: relative;
  z-index: 2;

  option {
    background-color: #181512;
    color: white;
  }
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

// زر "Filtrera"
const ToggleButton = styled.button`
  all: unset;
  background-color: #d4af37;
  color: #181512;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  text-align: center;
  cursor: pointer;
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Drawer للجوال
const Drawer = styled.div`
  position: fixed;
  top: 0;
  right: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
  width: 80%;
  max-width: 350px;
  height: 100%;
  background-color: rgba(24, 21, 18, 0.95);
  backdrop-filter: blur(6px);
  border-left: 2px solid #d4af37;
  padding: 2rem 1rem;
  z-index: 999;
  transition: right 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: -5px 0 15px #0008;

  @media (min-width: 769px) {
    display: none;
  }
`;

const CloseButton = styled.button`
  all: unset;
  background-color: #d4af37;
  color: #181512;
  font-weight: bold;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  align-self: flex-end;
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
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      {/* زر الموبايل لفتح Drawer */}
      <ToggleButton onClick={() => setIsOpen(true)}>Filtrera</ToggleButton>

      {/* Drawer للموبايل */}
      <Drawer isOpen={isOpen} ref={drawerRef}>
        <CloseButton onClick={() => setIsOpen(false)}>Stäng</CloseButton>

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
          onChange={(e) => setSelectedType(e.target.value)}>
          <option value="">Alla typer</option>
          <option value="Tatuering">Tatuering</option>
          <option value="Konsultation">Konsultation</option>
          <option value="Uppföljning">Uppföljning</option>
        </Select>

        <Select
          value={selectedArtist}
          onChange={(e) => setSelectedArtist(e.target.value)}>
          <option value="">Alla tatuerare</option>
          {allArtists.map((artist) => (
            <option key={artist} value={artist}>
              {artist}
            </option>
          ))}
        </Select>

        <Select
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}>
          <option value="">Alla tider</option>
          {[
            '09:00',
            '10:00',
            '11:00',
            '13:00',
            '14:00',
            '15:00',
            '16:00',
            '17:00',
          ].map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </Select>

        <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Ingen sortering</option>
          <option value="time">Sortera efter tid</option>
        </Select>

        <Button onClick={onReset} secondary>
          Återställ
        </Button>
        <CountBox>
          Visar {filtered} / {total}
        </CountBox>
      </Drawer>

      {/* الفلاتر العادية للشاشات الكبيرة */}
      <FiltersWrapper>
        <StatusFilterRow>
          {[
            { label: 'Alla', value: 'All' },
            { label: 'Idag', value: 'Today' },
            { label: 'Kommande', value: 'Upcoming' },
            { label: 'Tidigare', value: 'Past' },
          ].map(({ label, value }) => (
            <Button
              key={value}
              active={statusFilter === value}
              onClick={() => setStatusFilter(value)}>
              {label}
            </Button>
          ))}
        </StatusFilterRow>

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

          <Select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}>
            <option value="">Alla typer</option>
            <option value="Tatuering">Tatuering</option>
            <option value="Konsultation">Konsultation</option>
            <option value="Uppföljning">Uppföljning</option>
          </Select>

          <Select
            value={selectedArtist}
            onChange={(e) => setSelectedArtist(e.target.value)}>
            <option value="">Alla tatuerare</option>
            {allArtists.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </Select>

          <Select
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}>
            <option value="">Alla tider</option>
            {[
              '09:00',
              '10:00',
              '11:00',
              '13:00',
              '14:00',
              '15:00',
              '16:00',
              '17:00',
            ].map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Select>

          <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Ingen sortering</option>
            <option value="time">Sortera efter tid</option>
          </Select>

          <Button onClick={onReset} secondary>
            Återställ
          </Button>
          <CountBox>
            Visar {filtered} / {total}
          </CountBox>
        </FilterRow>
      </FiltersWrapper>
    </>
  );
}
