import React from 'react';
import PropTypes from 'prop-types';
import './CustomLink.css';

function CustomLink({
  path, children, className, ...props
}) {
  return (
    <a href={path} className={`custom-link ${className}`} rel="noreferrer" target={props.target}>
      {children}
    </a>
  );
}

CustomLink.propTypes = {
  path: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  target: PropTypes.string,
};

CustomLink.defaultProps = {
  target: '_self',
};

export default CustomLink;
