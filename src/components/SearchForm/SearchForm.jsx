import React from 'react';
import Button from '../Button/Button';

import searchFormIcon from '../../images/search-form-icon.svg';

import './SearchForm.css';

function SearchForm() {
  return (
    <section className="search-form">
      <h1 className="visually-hidden">Поиск по фильмам</h1>
      <form className="search-form__form">
        <p className="search-form__field">
          <label className="search-form__label" htmlFor="movie-input">
            <span className="visually-hidden">Фильм</span>
            <input
              className="search-form__input"
              type="text"
              name="movie"
              id="movie-input"
              defaultValue="Фильм"
              minLength="2"
              maxLength="40"
              required
            />
          </label>
          <Button className="search-form__submit-button" onClick={{}} isSubmitButton>
            <img
              className="search-form__submit-button-image"
              src={searchFormIcon}
              alt="Найти фильм"
            />
          </Button>
        </p>
        <div className="search-form__shorts-wrapper">
          <Button
            className="search-form__shorts-button"
            onClick={{}}
            ariaLabel="Искать только короткометражные фильмы"
          />
          <span className="search-form__shorts-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
