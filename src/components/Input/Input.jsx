import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({
  className, type, name, id, onChange, required, placeholder, labelText,
}) {
  return (
    <label htmlFor={id}>
      <span className="visually-hidden">{labelText}</span>
      <input
        className={`input ${className}`}
        type={type}
        name={name}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}

Input.propTypes = {
  className: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  labelText: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '',
  labelText: '',
  required: false,
};

export default Input;
