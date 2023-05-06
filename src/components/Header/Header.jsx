import { React, useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginContext from '../../contexts/LoginContext';

import Navigation from '../Navigation/Navigation';
import CustomLink from '../CustomLink/CustomLink';

import { BASE_URL } from '../../utils/scripts/constants';

import headerLogo from '../../images/header-logo.svg';

import './Header.css';

function Header({ isDarkTheme, isEmptyHeader }) {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header
      className={`header ${isDarkTheme ? 'header_dark' : ''} 
      ${isEmptyHeader ? 'header_empty' : ''}`}
    >
      <CustomLink
        className="header__link"
        path={`${BASE_URL.MOVIES_EXPLORER_FRONT}/`}
        onClick={() => {
          <Navigate to={`${BASE_URL.MOVIES_EXPLORER_FRONT}/`} />;
        }}
        ariaLabel="Перейти на главную страницу"
      >
        <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      </CustomLink>
      {isLoggedIn && !isEmptyHeader && <Navigation isDarkTheme={isDarkTheme} />}
      {!isLoggedIn && !isEmptyHeader && (
        <>
          <CustomLink path={`${BASE_URL.MOVIES_EXPLORER_FRONT}/signup`} className="header__signup">
            Регистрация
          </CustomLink>
          <CustomLink path={`${BASE_URL.MOVIES_EXPLORER_FRONT}/signin`} className="header__signin">
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
