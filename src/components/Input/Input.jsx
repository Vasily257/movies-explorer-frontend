import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input({
  inputClassName,
  type,
  name,
  id,
  value,
  placeholder,
  onChange,
  wrapperClassName,
  isLabelShown,
  labelClassName,
  labelText,
  minLength,
  maxLength,
  required,
}) {
  return (
    <label className={wrapperClassName} htmlFor={id}>
      <span className={`${isLabelShown ? labelClassName : 'visually-hidden'}`}>{labelText}</span>
      <input
        className={`input ${inputClassName}`}
        type={type}
        name={name}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
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
  value: PropTypes.string,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string,
  isLabelShown: PropTypes.bool,
  labelClassName: PropTypes.string,
  labelText: PropTypes.string,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
};

Input.defaultProps = {
  value: '',
  placeholder: '',
  wrapperClassName: '',
  isLabelShown: false,
  labelClassName: '',
  labelText: '',
  minLength: 1,
  maxLength: 999,
  required: false,
};

export default Input;
