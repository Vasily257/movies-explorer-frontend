import { React, useContext } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import './Header.css';

import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

import { LoginContext } from '../../contexts/LoginContext';

function Header({ isDarkTheme }) {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header className={`header ${isDarkTheme && 'header_theme_dark'}`}>
      <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      {isLoggedIn ? (
        <Navigation />
      ) : (
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
  isDarkTheme: PropTypes.bool,
};

Header.defaultProps = {
  isDarkTheme: false,
};

export default Header;
