import { React, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { MenuContext } from '../../contexts/MenuContext';
import Button from '../Button/Button';

import './Navigation.css';

import headerMenuOpened from '../../images/header-menu-opened.svg';
import headerMenuClosed from '../../images/header-menu-closed.svg';

function Navigation() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  return (
    <div className="navigation">
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
          <NavLink
            to="/saved-movies"
            className="navigation__link"
          >
            Сохранённые фильмы
          </NavLink>
        </li>

      </ul>
      <Button
        isSubmitButton={false}
        onClick={() => { setIsMenuOpen(!isMenuOpen); }}
        className="button"
        disabled={false}
      >
        <img
          className={`header__menu ${isMenuOpen ? 'header__menu_opened' : 'header__menu_closed'}`}
          src={`${isMenuOpen ? headerMenuOpened : headerMenuClosed}`}
          alt={`${isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}`}
        />
      </Button>
    </div>
  );
}

export default Navigation;
