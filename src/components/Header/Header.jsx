import { React, useContext } from 'react';
import PropTypes from 'prop-types';

import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

import { LoginContext } from '../../contexts/LoginContext';
import CustomLink from '../CustomLink/CustomLink';

import './Header.css';

function Header({ isDarkTheme, isEmptyHeader }) {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header
      className={`header ${isDarkTheme ? 'header_dark' : ''} 
      ${isEmptyHeader ? 'header_empty' : ''}`}
    >
      <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
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
};

Header.defaultProps = {
  isDarkTheme: false,
  isEmptyHeader: false,
};

export default Header;
