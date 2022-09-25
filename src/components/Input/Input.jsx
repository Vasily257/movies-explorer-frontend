import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({
  inputClassName,
  type,
  name,
  id,
  onChange,
  required,
  placeholder,
  isLabelShown,
  labelClassName,
  labelText,
}) {
  return (
    <label htmlFor={id}>
      <span className={`${isLabelShown ? labelClassName : 'visually-hidden'}`}>{labelText}</span>
      <input
        className={`input ${inputClassName}`}
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
  inputClassName: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  isLabelShown: PropTypes.bool,
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  required: PropTypes.bool,
};

Input.defaultProps = {
  placeholder: '',
  isLabelShown: false,
  labelClassName: '',
  labelText: '',
  required: false,
};

export default Input;
