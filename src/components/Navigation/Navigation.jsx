import { React } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Menu from '../Menu/Menu';
import './Navigation.css';

function Navigation({ isLoggedIn }) {
  return (
    <nav className="navigation">
      {isLoggedIn ? <Menu /> : (
        <ul className="navigation__list">
          <li className="navigation__item">
            <Link to="/signup" className="navigation__link">
              Регистрация
            </Link>
          </li>
          <li className="navigation__item">
            <Link to="/signin" className="navigation__link">
              Войти
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Navigation;
