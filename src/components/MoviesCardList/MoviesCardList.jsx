import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

import { calcuateMovies } from '../../utils/scripts/utils';

import './MoviesCardList.css';

function MoviesCardList({ moviesList, isSavedMovies }) {
  const [moviesCount, setMoviesCount] = useState(0);
  const [addedMovies, setAddedMovies] = useState(0);

  const { allMoviesCount, savedMoviesCount, addingMovie } = calcuateMovies();

  useEffect(() => {
    setMoviesCount(isSavedMovies ? savedMoviesCount : allMoviesCount);
    setAddedMovies(addingMovie);
  });

  return (
    <section
      className={`movies-card-list ${isSavedMovies ? 'movies-card-list_padding-bottom' : ''}`}
    >
      <h2 className="visually-hidden">
        {isSavedMovies ? 'Список сохраненных фильмов' : 'Список фильмов'}
      </h2>
      <ul className="movies-card-list__movies">
        {moviesList.map(
          ({
            id, nameRU, image, duration,
          }, index) => index < moviesCount && (
          <MoviesCard
            key={id}
            name={nameRU}
            url={image.url}
            duration={duration}
            isSavedMovies={isSavedMovies}
          />
          ),
        )}
      </ul>
      {!isSavedMovies && (
        <Button
          className="movies-card-list__more"
          onClick={() => {
            setMoviesCount(moviesCount + addedMovies);
          }}
        >
          Ещё
        </Button>
      )}
    </section>
  );
}

MoviesCardList.propTypes = {
  moviesList: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  isSavedMovies: PropTypes.bool,
};

MoviesCardList.defaultProps = {
  isSavedMovies: false,
  moviesList: [],
};

export default MoviesCardList;
