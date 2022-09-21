import { React, useContext } from 'react';

import { MoviesContext } from '../../contexts/MoviesContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

import { calcuateAllMovies } from '../../utils/scripts/utils';

import './MoviesCardList.css';

function MoviesCardList() {
  const { movies } = useContext(MoviesContext);
  const { moviesCount } = calcuateAllMovies();

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
      <Button className="movies-card-list__more">Ещё</Button>
    </section>
  );
}

export default MoviesCardList;
