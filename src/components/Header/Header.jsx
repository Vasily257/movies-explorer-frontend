import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      <Navigation isLoggedIn={isLoggedIn} />
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
