import { React, useContext } from 'react';
import './Menu.css';
import { NavLink } from 'react-router-dom';
import MenuContext from '../../contexts/MenuContext';
import Button from '../Button/Button';

import headerMenuOpened from '../../images/header-menu-opened.svg';
import headerMenuClosed from '../../images/header-menu-closed.svg';

function Menu() {
  const {
    isMenuOpen,
    setIsMenuOpen,
  } = useContext(MenuContext);

  return (
    <>
      <ul className="navigation__list">
        <li className="navigation__item">
          <NavLink to="/" className="navigation_link">
            Главная
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/movies" className="navigation_link">
            Фильмы
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink
            to="/saved-movies"
            className="navigation_link"
          >
            Сохранённые фильмы
          </NavLink>
        </li>
        <li className="navigation__item">
          <NavLink to="/profile" className="navigation_link">
            Аккаунт
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
    </>
  );
}

export default Menu;
