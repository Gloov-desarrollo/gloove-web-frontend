
import React from 'react';
import './../assets/css/booking/Chip.css';

const Chip = ({ label, selected, onClick }) => {
  return (
    <button
      className={`chip ${selected ? 'selected' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Chip;
