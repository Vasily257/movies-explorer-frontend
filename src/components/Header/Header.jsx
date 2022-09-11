import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './Header.css';

import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

function Header({ isLoggedIn }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      {isLoggedIn ? <Navigation />
        : (
          <>
            <Link to="/signup" className="header__signup">
              Регистрация
            </Link>
            <Link to="/signin" className="header__signup">
              Войти
            </Link>
          </>
        )}
    </header>
  );
}

Header.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Header;
