import { React, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

import { calcuateMovies } from '../../utils/scripts/utils';
import initialMovies from '../../utils/scripts/movies-base.json';

import './MoviesCardList.css';

function MoviesCardList({ isSavedMovies }) {
  const [movies, setMovies] = useState([]);

  const [moviesCount, setMoviesCount] = useState(0);
  const [addedMovies, setAddedMovies] = useState(0);

  const { allMoviesCount, savedMoviesCount, addingMovie } = calcuateMovies();

  useEffect(() => {
    setMovies(initialMovies);
    setMoviesCount(isSavedMovies ? savedMoviesCount : allMoviesCount);
    setAddedMovies(addingMovie);
  });

  return (
    <section className="movies-card-list">
      <h2 className="visually-hidden">Список фильмов</h2>
      <ul className="movies-card-list__movies">
        {movies.map(
          ({
            id, nameRU, image, duration,
          }, index) => index < moviesCount && (
          <MoviesCard key={id} name={nameRU} url={image.url} duration={duration} />
          ),
        )}
      </ul>
      <Button
        className="movies-card-list__more"
        onClick={() => {
          setMoviesCount(moviesCount + addedMovies);
        }}
      >
        Ещё
      </Button>
    </section>
  );
}

MoviesCardList.propTypes = {
  isSavedMovies: PropTypes.bool,
};

MoviesCardList.defaultProps = {
  isSavedMovies: false,
};

export default MoviesCardList;
