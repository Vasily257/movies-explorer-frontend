import {
  React, useState, useEffect, useRef, useContext,
} from 'react';
import PropTypes from 'prop-types';

import DisplayedDataContext from '../../contexts/DisplayedDataContext';
import useColumns from '../../hooks/useColumns';

import MoviesCard from '../MoviesCard/MoviesCard';
import ErrorElement from '../ErrorElement/ErrorElement';
import Button from '../Button/Button';

import { MOVIES_ERROR_TEXT } from '../../utils/scripts/constants';
import { getRows, getAddedMovies, filterMovies } from '../../utils/scripts/utils';

import './MoviesCardList.css';

function MoviesCardList({
  savedMovies, isSavedMovies, onAddSavedMovie, onDeleteSavedMovie,
}) {
  const { displayedData } = useContext(DisplayedDataContext);
  const [moviesCount, setMoviesCount] = useState(1);
  const [limitation, setLimitation] = useState(Infinity);
  const [errorText, setErrorText] = useState('');

  const {
    allMovies, searchQuery, isShortsMovies, queryErrorText,
  } = displayedData;

  const gridContainer = useRef(null);
  const columns = useColumns(gridContainer.current);

  const filtredMovies = filterMovies(allMovies, searchQuery, limitation);

  useEffect(() => {
    setMoviesCount(columns * getRows(columns));
  }, [columns]);

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
  }, [queryErrorText, filtredMovies.length, searchQuery]);

  useEffect(() => {
    if (isShortsMovies) {
      setLimitation(40);
    } else {
      setLimitation(Infinity);
    }
  }, [isShortsMovies]);

  return (
    <section
      className={`movies-card-list ${isSavedMovies ? 'movies-card-list_padding-bottom' : ''}`}
    >
      <h2 className="visually-hidden">
        {!isSavedMovies ? 'Список фильмов' : 'Список сохраненных фильмов'}
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
                thumbnail,
                movieId,
              },
              index,
            ) => index < moviesCount && (
            <MoviesCard
              key={movieId}
              country={country}
              director={director}
              duration={duration}
              year={year}
              description={description}
              image={image}
              trailerLink={trailerLink}
              nameRU={nameRU}
              nameEN={nameEN}
              thumbnail={thumbnail}
              movieId={movieId}
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
            setMoviesCount((prevState) => prevState + getAddedMovies(columns));
          }}
        >
          Ещё
        </Button>
      )}
    </section>
  );
}

MoviesCardList.propTypes = {
  savedMovies: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ),
  isSavedMovies: PropTypes.bool,
  onAddSavedMovie: PropTypes.func,
  onDeleteSavedMovie: PropTypes.func,
};

MoviesCardList.defaultProps = {
  savedMovies: [],
  isSavedMovies: false,
  onAddSavedMovie: () => {},
  onDeleteSavedMovie: () => {},
};

export default MoviesCardList;
