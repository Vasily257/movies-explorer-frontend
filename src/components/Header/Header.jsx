import { React, useContext } from 'react';
import PropTypes from 'prop-types';

import LoginContext from '../../contexts/LoginContext';

import Navigation from '../Navigation/Navigation';
import CustomLink from '../CustomLink/CustomLink';

import headerLogo from '../../images/header-logo.svg';

import './Header.css';

function Header({ isDarkTheme, isEmptyHeader, onSignOut }) {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header
      className={`header ${isDarkTheme ? 'header_dark' : ''} 
      ${isEmptyHeader ? 'header_empty' : ''}`}
    >
      <CustomLink
        className="header__link"
        path="/"
        onClick={() => {
          onSignOut();
        }}
        ariaLabel="Перейти на главную страницу"
      >
        <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      </CustomLink>
      {isLoggedIn && !isEmptyHeader && <Navigation />}
      {!isLoggedIn && !isEmptyHeader && (
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
  isEmptyHeader: PropTypes.bool,
  onSignOut: PropTypes.func,
};

Header.defaultProps = {
  isDarkTheme: false,
  isEmptyHeader: false,
  onSignOut: () => {},
};

export default Header;
