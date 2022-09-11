import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

function Button({
  isSubmitButton, children, onClick, className, disabled,
}) {
  return (
    <button type={isSubmitButton ? 'submit' : 'button'} onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  );
}

Button.propTypes = {
  isSubmitButton: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default Button;
