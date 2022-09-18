import { React, useContext } from 'react';
import { MenuContext } from '../../contexts/MenuContext';

import Button from '../Button/Button';
import CustomLink from '../CustomLink/CustomLink';

import navigationButtonOpened from '../../images/navigation-button-opened.svg';
import navigationButtonClosed from '../../images/navigation-button-closed.svg';

import './Navigation.css';

function Navigation() {
  const { isMenuOpen, setIsMenuOpen } = useContext(MenuContext);

  return (
    <nav className={`navigation ${isMenuOpen ? 'navigation_opened' : ''}`}>
      <Button
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        className={`navigation__button ${isMenuOpen ? 'navigation__button_opened' : ''}`}
      >
        <img
          className={`navigation__button-image ${
            isMenuOpen ? 'navigation__button_opened' : 'navigation__button_closed'
          }`}
          src={`${isMenuOpen ? navigationButtonOpened : navigationButtonClosed}`}
          alt={`${isMenuOpen ? 'Закрыть меню' : 'Открыть меню'}`}
        />
      </Button>
      <ul className={`navigation__list ${isMenuOpen ? 'navigation__list_opened' : ''}`}>
        <li className="navigation__item">
          <CustomLink
            path="/"
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Главная
          </CustomLink>
        </li>
        <li className="navigation__item">
          <CustomLink
            path="/movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Фильмы
          </CustomLink>
        </li>
        <li className="navigation__item">
          <CustomLink
            path="/saved-movies"
            className="navigation__link"
            activeClassName="navigation__link_active"
          >
            Сохранённые фильмы
          </CustomLink>
        </li>
      </ul>
      <CustomLink
        path="/profile"
        className={`navigation__profile ${isMenuOpen ? 'navigation__profile_opened' : ''}`}
      >
        Аккаунт
      </CustomLink>
    </nav>
  );
}

export default Navigation;
