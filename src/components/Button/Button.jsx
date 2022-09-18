import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({
  children, className, isSubmitButton, onClick, ariaLabel, disabled,
}) {
  return (
    <button
      className={className}
      type={isSubmitButton ? 'submit' : 'button'}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  isSubmitButton: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  isSubmitButton: false,
  ariaLabel: '',
  disabled: false,
};

export default Button;
