
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import './../assets/css/booking/Stepper.css';

const Stepper = ({ label, value, onIncrease, onDecrease, iconColor }) => {
  
  // Console.log para depurar
  console.log(`Stepper "${label}" received iconColor:`, iconColor);

  const iconStyle = {
    color: iconColor,
  };

  return (
    <div className="stepper mb-3">
      <label className="form-label">{label}</label>
      <div className="input-group">
        <button className="btn btn-outline-secondary" type="button" onClick={onDecrease}>
          <FontAwesomeIcon icon={faMinus} style={iconStyle} />
        </button>
        <input type="text" className="form-control text-center" value={value} readOnly />
        <button className="btn btn-outline-secondary" type="button" onClick={onIncrease}>
          <FontAwesomeIcon icon={faPlus} style={iconStyle} />
        </button>
      </div>
    </div>
  );
};

export default Stepper;
