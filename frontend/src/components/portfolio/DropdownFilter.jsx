import React, { useState } from 'react';
import "../../styles/portfolio/DropdownFilter.css";
const DropdownFilter = ({ label, options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown-filter">
      <button
        className="dropdown-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Select ${label}`}
        type="button"
      >
        {selected === 'all' ? `Alla ${label}` : selected}
        <span className={`arrow ${isOpen ? 'open' : ''}`}>▼</span>
      </button>
      {isOpen && (
        <ul className="dropdown-list" role="listbox" tabIndex={-1}>
          {options.map((option) => (
            <li key={option}>
              <button
                role="option"
                aria-selected={selected === option}
                onClick={() => handleSelect(option)}
                type="button"
              >
                {option === 'all' ? `Alla ${label}` : option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownFilter;
