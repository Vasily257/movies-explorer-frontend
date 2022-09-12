import { React, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { MenuContext } from '../../contexts/MenuContext';
import Button from '../Button/Button';

import './Navigation.css';

import navigationButtonOpened from '../../images/navigation-button-opened.svg';
import navigationButtonClosed from '../../images/navigation-button-closed.svg';

function Navigation() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  return (
    <nav className="navigation">
      <Button
        isSubmitButton={false}
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        className="button navigation__button"
        disabled={false}
      >
        <img
          className={`navigation__button-image ${
            isMenuOpen ? 'navigation__button_opened' : 'navigation__button_closed'
          }`}
          src={`${isMenuOpen ? navigationButtonOpened : navigationButtonClosed}`}
          alt={`${isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}`}
        />
      </Button>
      {isMenuOpen && (
        <>
          <ul className="navigation__list">
            <li className="navigation__item">
              <NavLink to="/" className="navigation__link">
                Главная
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/movies" className="navigation__link">
                Фильмы
              </NavLink>
            </li>
            <li className="navigation__item">
              <NavLink to="/saved-movies" className="navigation__link">
                Сохранённые фильмы
              </NavLink>
            </li>
          </ul>
          <Link to="/profile" className="navigation__profile">
            Аккаунт
          </Link>
        </>
      )}
    </nav>
  );
}

export default Navigation;
