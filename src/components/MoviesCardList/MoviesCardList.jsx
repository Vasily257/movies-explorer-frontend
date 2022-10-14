import {
  React, useState, useEffect, useRef, useContext,
} from 'react';
import PropTypes from 'prop-types';

import SavedMoviesContext from '../../contexts/SavedMoviesContext';
import useColumns from '../../hooks/useColumns';

import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorElement from '../ErrorElement/ErrorElement';
import Button from '../Button/Button';

import { MOVIES_ERROR_TEXT, BASE_URL } from '../../utils/scripts/constants';
import { getRows, getAddedMovies } from '../../utils/scripts/utils';

import './MoviesCardList.css';

function MoviesCardList({
  isSavedMovies,
  searchQuery,
  moviesList,
  queryErrorText,
  isShortsMovies,
  onAddSavedMovie,
  onDeleteSavedMovie,
}) {
  const [moviesCount, setMoviesCount] = useState(1);
  const [addedMovies, setAddedMovies] = useState(0);

  const [limitation, setLimitation] = useState(Infinity);

  const [errorText, setErrorText] = useState('');

  const gridContainer = useRef(null);
  const columns = useColumns(gridContainer.current);

  const { savedMovies } = useContext(SavedMoviesContext);

  const filtredMovies = moviesList.filter(({ nameRU, nameEN, duration }) => [nameRU, nameEN].some(
    (name) => name.includes(searchQuery.toLowerCase()) && duration < limitation,
  ));

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

    if (!filtredMovies.length && searchQuery) {
      setErrorText(MOVIES_ERROR_TEXT.NOT_FOUND);
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
      {filtredMovies.length ? (
        <ul className="movies-card-list__movies" ref={gridContainer}>
          {filtredMovies.map(
            (
              {
                country,
                director,
                duration,
                year,
                description,
                image,
                trailerLink,
                nameRU,
                nameEN,
                id,
              },
              index,
            ) => index < moviesCount && (
            <MoviesCard
              key={id}
              country={country}
              director={director}
              duration={duration}
              year={year}
              description={description}
              image={`${BASE_URL.BEATFILM_MOVIES}${image.url}`}
              trailerLink={trailerLink}
              nameRU={nameRU}
              nameEN={nameEN}
              thumbnail={`${BASE_URL.BEATFILM_MOVIES}${image.formats.thumbnail.url}`}
              movieId={id}
              savedMovies={savedMovies}
              isSavedMovies={isSavedMovies}
              onAddSavedMovie={onAddSavedMovie}
              onDeleteSavedMovie={onDeleteSavedMovie}
            />
            ),
          )}
        </ul>
      ) : (
        <ErrorElement className="movies-card-list__error" text={errorText} />
      )}
      {!isSavedMovies && filtredMovies.length > moviesCount && (
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
  onAddSavedMovie: PropTypes.func,
  onDeleteSavedMovie: PropTypes.func,
};

MoviesCardList.defaultProps = {
  searchQuery: '',
  isSavedMovies: false,
  moviesList: [],
  queryErrorText: '',
  isShortsMovies: false,
  onAddSavedMovie: () => {},
  onDeleteSavedMovie: () => {},
};

export default MoviesCardList;
