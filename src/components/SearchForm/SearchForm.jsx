import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useForm } from '../../hooks/useForm';

import Button from '../Button/Button';
import Input from '../Input/Input';
import ErrorElement from '../ErrorElement/ErrorElement';

import searchFormIcon from '../../images/search-form-icon.svg';

import './SearchForm.css';

function SearchForm({ setMoviesFromBase }) {
  const [isShortsMovies, setIsShortsMovies] = useState(false);
  const [errorText, setErrorText] = useState('');

  const { values, handleChange } = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    if (values.movie) {
      setMoviesFromBase();
      setErrorText('');
    } else {
      setErrorText('Нужно ввести ключевое слово');
    }
  }

  return (
    <section className="search-form">
      <h1 className="visually-hidden">Поиск по фильмам</h1>
      <form
        className="search-form__form"
        name="search"
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        noValidate
      >
        <Input
          inputClassName="search-form__input"
          type="text"
          name="movie"
          id="movie-input"
          onChange={(event) => {
            handleChange(event);
          }}
          value={values.name}
          placeholder="Фильм"
          labelText="Фильм"
          required
        />
        <Button className="search-form__submit-button" isSubmitButton>
          <img
            className="search-form__submit-button-image"
            src={searchFormIcon}
            alt="Найти фильм"
          />
        </Button>
        <ErrorElement className="search-form__submit-error" text={errorText} />
        <Input
          inputClassName="search-form__shorts-input"
          type="checkbox"
          name="shorts"
          id="shorts-input"
          onChange={() => {
            setIsShortsMovies(!isShortsMovies);
          }}
          wrapperClassName="search-form__shorts-wrapper"
          isLabelShown
          labelClassName="search-form__shorts-label"
          labelText="Короткометражки"
          isCheckbox
          checkboxClassName={`search-form__shorts-checkbox ${
            isShortsMovies ? 'search-form__shorts-checkbox_selected' : ''
          }`}
          required
        />
      </form>
    </section>
  );
}

SearchForm.propTypes = {
  setMoviesFromBase: PropTypes.func.isRequired,
};

export default SearchForm;
