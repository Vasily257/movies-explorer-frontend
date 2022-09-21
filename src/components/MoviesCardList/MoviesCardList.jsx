import { React, useContext } from 'react';

import PropTypes from 'prop-types';
import { MoviesContext } from '../../contexts/MoviesContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

import calcuateMovies from '../../utils/scripts/utils';

import './MoviesCardList.css';

function MoviesCardList({ isSavedMovies }) {
  const { movies } = useContext(MoviesContext);

  const { allMoviesCount, savedMoviesCount } = calcuateMovies();
  const moviesCount = isSavedMovies ? savedMoviesCount : allMoviesCount;

  return (
    <section className="movies-card-list">
      <h2 className="visually-hidden">Список фильмов</h2>
      <ul className="movies-card-list__movies">
        {movies.map(({
          id, nameRU, image, duration,
        }, index) => (index < moviesCount ? (
          <MoviesCard key={id} name={nameRU} url={image.url} duration={duration} />
        ) : null))}
      </ul>
      <Button className="movies-card-list__more" onClick={() => {}}>
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
