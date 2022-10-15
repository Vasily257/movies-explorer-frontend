import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

import Button from '../Button/Button';
import Input from '../Input/Input';

import { MOVIES_ERROR_TEXT } from '../../utils/scripts/constants';
import { localQuery } from '../../utils/scripts/utils';
import searchFormIcon from '../../images/search-form-icon.svg';

import './SearchForm.css';

function SearchForm({
  setSearchQuery,
  setMovies,
  setMoviesFromBase,
  isShortsMovies,
  setIsShortsMovies,
}) {
  const [errorText, setErrorText] = useState('');
  const { values, handleChange, setValues } = useForm();

  function handleSubmit(event) {
    event.preventDefault();
    if (values.movie) {
      const localMovies = JSON.parse(localStorage.getItem('moviesFromBase'));
      if (localMovies) {
        setMovies(localMovies);
      } else {
        setMoviesFromBase();
      }
      setSearchQuery(values.movie);
      setErrorText('');

      localStorage.setItem('query', values.movie);
      localStorage.setItem('isShortsMovies', isShortsMovies);
    } else {
      setErrorText(MOVIES_ERROR_TEXT.EMPTY_QUERY);
    }
  }

  useEffect(() => {
    setValues((prevValues) => ({ ...prevValues, movie: localQuery }));
  }, [setValues]);

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
          value={values.movie}
          placeholder="Фильм"
          labelText="Фильм"
          inputErrorClassName="search-form__submit-error"
          inputErrorText={errorText}
          required
        />
        <Button className="search-form__submit-button" isSubmitButton>
          <img
            className="search-form__submit-button-image"
            src={searchFormIcon}
            alt="Найти фильм"
          />
        </Button>

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
  setMovies: PropTypes.func.isRequired,
  setMoviesFromBase: PropTypes.func.isRequired,
  isShortsMovies: PropTypes.bool.isRequired,
  setIsShortsMovies: PropTypes.func.isRequired,
};

export default SearchForm;
