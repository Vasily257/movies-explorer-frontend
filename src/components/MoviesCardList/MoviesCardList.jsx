import { React, useContext, useState } from 'react';

import PropTypes from 'prop-types';
import { MoviesContext } from '../../contexts/MoviesContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

import calcuateMovies from '../../utils/scripts/utils';

import './MoviesCardList.css';

function MoviesCardList({ isSavedMovies }) {
  const { movies } = useContext(MoviesContext);
  const { allMoviesCount, savedMoviesCount, addingMovie } = calcuateMovies();

  const [moviesCount, setMoviesCount] = useState(isSavedMovies ? savedMoviesCount : allMoviesCount);

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
          setMoviesCount(moviesCount + addingMovie);
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
