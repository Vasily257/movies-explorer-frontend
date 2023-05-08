import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

import useScreenView from '../../hooks/useScreenView';

import Button from '../Button/Button';
import CustomLink from '../CustomLink/CustomLink';

import { BASE_URL } from '../../utils/scripts/constants';

import navigationButtonOpened from '../../images/navigation-button-opened.svg';
import navigationButtonClosedWhite from '../../images/navigation-button-closed-white.svg';
import navigationButtonClosedBlack from '../../images/navigation-button-closed-black.svg';

import './Navigation.css';

function Navigation({ isDarkTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDesktop } = useScreenView();

  const navigationButtonClosed = isDarkTheme
    ? navigationButtonClosedWhite
    : navigationButtonClosedBlack;

  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpen(false);
    }
  }, [isDesktop]);

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
        {isMenuOpen && (
          <li className="navigation__item">
            <CustomLink
              path={`${BASE_URL.MOVIES_EXPLORER_FRONT}/`}
              className="navigation__link"
              activeClassName="navigation__link_active"
              onClick={() => {
                <Navigate to={`${BASE_URL.MOVIES_EXPLORER_FRONT}/`} />;
              }}
            >
              Главная
            </CustomLink>
          </li>
        )}
        <li className="navigation__item">
          <CustomLink
            path={`${BASE_URL.MOVIES_EXPLORER_FRONT}/movies`}
            className={`navigation__link ${isDarkTheme ? 'navigation__link_color_white ' : ''}`}
            activeClassName="navigation__link_active"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Фильмы
          </CustomLink>
        </li>
        <li className="navigation__item">
          <CustomLink
            path={`${BASE_URL.MOVIES_EXPLORER_FRONT}/saved-movies`}
            className={`navigation__link ${isDarkTheme ? 'navigation__link_color_white ' : ''}`}
            activeClassName="navigation__link_active"
            onClick={() => {
              setIsMenuOpen(false);
            }}
          >
            Сохранённые фильмы
          </CustomLink>
        </li>
      </ul>
      <CustomLink
        path={`${BASE_URL.MOVIES_EXPLORER_FRONT}/profile`}
        className={`navigation__profile ${isMenuOpen ? 'navigation__profile_opened' : ''}`}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        Аккаунт
      </CustomLink>
    </nav>
  );
}

Navigation.propTypes = {
  isDarkTheme: PropTypes.bool,
};

Navigation.defaultProps = {
  isDarkTheme: false,
};

export default Navigation;
