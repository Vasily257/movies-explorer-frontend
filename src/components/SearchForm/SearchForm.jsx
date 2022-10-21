import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useForm from '../../hooks/useForm';

import Button from '../Button/Button';
import Input from '../Input/Input';

import { MOVIES_ERROR_TEXT } from '../../utils/scripts/constants';
import searchFormIcon from '../../images/search-form-icon.svg';

import './SearchForm.css';

function SearchForm({ setMoviesFromBeatfilm, displayedData, setDisplayedData }) {
  const { values, setValues, handleChange } = useForm();
  const [errorText, setErrorText] = useState('');

  const { isShortsMovies } = displayedData;

  const localStorageData = {
    searchQuery: localStorage.getItem('query'),
    beatfilmMovies: JSON.parse(localStorage.getItem('moviesFromBeatfilm')),
    isShortsMovies: JSON.parse(localStorage.getItem('isShortsMovies')),
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (values.movie) {
      if (localStorageData.beatfilmMovies) {
        setDisplayedData((prevData) => ({
          ...prevData,
          allMovies: localStorageData.beatfilmMovies,
        }));
      } else {
        setMoviesFromBeatfilm();
      }

      setDisplayedData((prevData) => ({ ...prevData, searchQuery: values.movie }));
      setErrorText('');

      localStorage.setItem('query', values.movie);
      localStorage.setItem('isShortsMovies', isShortsMovies);
    } else {
      setErrorText(MOVIES_ERROR_TEXT.EMPTY_QUERY);
    }
  }

  useEffect(() => {
    setValues((prevValues) => ({
      ...prevValues,
      movie: localStorageData.searchQuery || '',
    }));
  }, [localStorageData.searchQuery, setValues]);

  return (
    <section className="search-form">
      <h1 className="visually-hidden">Поиск по&nbsp;фильмам</h1>
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
            setDisplayedData((prevData) => ({ ...prevData, isShortsMovies: !isShortsMovies }));
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
  displayedData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      ),
    ]),
  ).isRequired,
  setDisplayedData: PropTypes.func.isRequired,
  setMoviesFromBeatfilm: PropTypes.func,
};

SearchForm.defaultProps = {
  setMoviesFromBeatfilm: () => {},
};

export default SearchForm;
