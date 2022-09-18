import { React, useContext } from 'react';
import PropTypes from 'prop-types';

import './Header.css';

import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

import { LoginContext } from '../../contexts/LoginContext';
import CustomLink from '../CustomLink/CustomLink';

function Header({ isDarkTheme }) {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header className={`header ${isDarkTheme ? 'header_theme_dark' : ''}`}>
      <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      {isLoggedIn ? (
        <Navigation />
      ) : (
        <>
          <CustomLink path="/signup" className="header__signup">
            Регистрация
          </CustomLink>
          <CustomLink path="/signin" className="header__signin">
            Войти
          </CustomLink>
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
