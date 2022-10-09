import {
  React, useState, useEffect, useRef,
} from 'react';
import PropTypes from 'prop-types';

import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorElement from '../ErrorElement/ErrorElement';
import Button from '../Button/Button';

import { ERROR_TEXT } from '../../utils/scripts/constants';
import { getRows, getAddedMovies } from '../../utils/scripts/utils';
import useColumns from '../../hooks/useColumns';

import './MoviesCardList.css';

function MoviesCardList({
  isSavedMovies,
  searchQuery,
  moviesList,
  queryErrorText,
  isShortsMovies,
}) {
  const [moviesCount, setMoviesCount] = useState(1);
  const [addedMovies, setAddedMovies] = useState(0);

  const [limitation, setLimitation] = useState(Infinity);

  const [errorText, setErrorText] = useState('');

  const gridContainer = useRef(null);
  const columns = useColumns(gridContainer.current);

  const filtredMoviesList = moviesList.filter(
    ({ nameRU, nameEN, duration }) => [nameRU, nameEN].some((name) => (
      name.includes(searchQuery.toLowerCase()))
      && duration < limitation),
  );

  useEffect(() => {
    setAddedMovies(0);
  }, [columns]);

  useEffect(() => {
    setMoviesCount(columns * getRows(columns) + addedMovies);
  });

  useEffect(() => {
    if (queryErrorText) {
      setErrorText(queryErrorText);
      return;
    }

    if (!filtredMoviesList.length && searchQuery) {
      setErrorText(ERROR_TEXT.MOVIES_NOT_FOUND);
      return;
    }

    setErrorText('');
  });

  useEffect(() => {
    if (isShortsMovies) {
      setLimitation(40);
    } else {
      setLimitation(Infinity);
    }
  });

  return (
    <section
      className={`movies-card-list ${isSavedMovies ? 'movies-card-list_padding-bottom' : ''}`}
    >
      <h2 className="visually-hidden">
        {isSavedMovies ? 'Список сохраненных фильмов' : 'Список фильмов'}
      </h2>
      {filtredMoviesList.length ? (
        <ul className="movies-card-list__movies" ref={gridContainer}>
          {filtredMoviesList.map(
            ({
              id, nameRU, image, duration, trailerLink,
            }, index) => index < moviesCount && (
            <MoviesCard
              key={id}
              name={nameRU}
              imageUrl={image.url}
              duration={duration}
              trailerLink={trailerLink}
              isSavedMovies={isSavedMovies}
            />
            ),
          )}
        </ul>
      ) : (
        <ErrorElement className="movies-card-list__error" text={errorText} />
      )}
      {!isSavedMovies && filtredMoviesList.length > moviesCount && (
        <Button
          className="movies-card-list__more"
          onClick={() => {
            setAddedMovies(addedMovies + getAddedMovies(columns));
          }}
        >
          Ещё
        </Button>
      )}
    </section>
  );
}

MoviesCardList.propTypes = {
  searchQuery: PropTypes.string,
  moviesList: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.objectOf(
            PropTypes.oneOfType([
              PropTypes.string,
              PropTypes.number,
              PropTypes.objectOf(
                PropTypes.oneOfType([
                  PropTypes.string,
                  PropTypes.number,
                  PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
                ]),
              ),
            ]),
          ),
        ]),
      ),
    ]),
  ),
  isSavedMovies: PropTypes.bool,
  queryErrorText: PropTypes.string,
  isShortsMovies: PropTypes.bool,
};

MoviesCardList.defaultProps = {
  searchQuery: '',
  isSavedMovies: false,
  moviesList: [],
  queryErrorText: '',
  isShortsMovies: false,
};

export default MoviesCardList;
