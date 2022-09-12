import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';

import { LoginContext } from '../../contexts/LoginContext';

function Header() {
  const { isLoggedIn } = useContext(LoginContext);
  return (
    <header className="header">
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

export default Header;
