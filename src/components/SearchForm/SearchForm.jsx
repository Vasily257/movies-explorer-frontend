import { React, useState } from 'react';
import Button from '../Button/Button';

import searchFormIcon from '../../images/search-form-icon.svg';

import './SearchForm.css';
import Input from '../Input/Input';

function SearchForm() {
  const [isShortsMovies, setIsShortsMovies] = useState(true);

  return (
    <section className="search-form">
      <h1 className="visually-hidden">Поиск по фильмам</h1>
      <form className="search-form__form">
        <p className="search-form__field">
          <Input
            inputClassName="search-form__input"
            type="text"
            name="movie"
            id="movie-input"
            onChange={() => {}}
            placeholder="Фильм"
            labelText="Фильм"
            required
          />
          <Button className="search-form__submit-button" onClick={() => {}} isSubmitButton>
            <img
              className="search-form__submit-button-image"
              src={searchFormIcon}
              alt="Найти фильм"
            />
          </Button>
        </p>
        <div className="search-form__shorts-wrapper">
          <Button
            className={`search-form__shorts-button ${
              isShortsMovies ? 'search-form__shorts-button__selected' : ''
            }`}
            onClick={() => {
              setIsShortsMovies(!isShortsMovies);
            }}
            ariaLabel="Искать только короткометражные фильмы"
          />
          <span className="search-form__shorts-text">Короткометражки</span>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
