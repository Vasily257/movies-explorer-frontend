import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { useForm } from '../../hooks/useForm';

import Button from '../Button/Button';
import Input from '../Input/Input';
import ErrorElement from '../ErrorElement/ErrorElement';

import { ERROR_TEXT } from '../../utils/scripts/constants';

import searchFormIcon from '../../images/search-form-icon.svg';

import './SearchForm.css';

function SearchForm({
  setSearchQuery, setMoviesFromBase, isShortsMovies, setIsShortsMovies,
}) {
  const [errorText, setErrorText] = useState('');

  const { values, handleChange } = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    if (values.movie) {
      setSearchQuery(values.movie);
      setMoviesFromBase();
      setErrorText('');

      localStorage.setItem('query', values.movie);
      localStorage.setItem('isShortsMovies', isShortsMovies);
    } else {
      setErrorText(ERROR_TEXT.EMPTY_SEARCH_QUERY);
    }
  }

  useEffect(() => {
    const localIsShortsMovies = JSON.parse(localStorage.getItem('isShortsMovies'));

    if (localIsShortsMovies) {
      setIsShortsMovies(localIsShortsMovies);
    }
  }, []);

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
          inputClassName={`search-form__shorts-input ${
            isShortsMovies ? 'search-form__shorts-input_checked' : ''
          }`}
          type="checkbox"
          name="shorts"
          id="shorts-input"
          onChange={() => {
            setIsShortsMovies(!isShortsMovies);
            localStorage.setItem('isShortsMovies', !isShortsMovies);
          }}
          wrapperClassName="search-form__shorts-wrapper"
          isLabelShown
          labelClassName="search-form__shorts-label"
          labelText="Короткометражки"
          required
        />
      </form>
    </section>
  );
}

SearchForm.propTypes = {
  setSearchQuery: PropTypes.func.isRequired,
  setMoviesFromBase: PropTypes.func.isRequired,
  isShortsMovies: PropTypes.bool.isRequired,
  setIsShortsMovies: PropTypes.func.isRequired,
};

export default SearchForm;
