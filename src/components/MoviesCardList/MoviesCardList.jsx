import { React, useContext } from 'react';

import { CardsContext } from '../../contexts/CardsContext';
import MoviesCard from '../MoviesCard/MoviesCard';
import Button from '../Button/Button';

import calcuateCards from '../../utils/scripts/utils';

import './MoviesCardList.css';

function MoviesCardList() {
  const { cards } = useContext(CardsContext);
  const { cardCount } = calcuateCards();

  return (
    <section className="movies-card-list">
      <h2 className="visually-hidden">Список фильмов</h2>
      <ul className="movies-card-list__movies">
        {cards.map(({
          id, nameRU, image, duration,
        }, index) => (index < cardCount ? (
          <MoviesCard key={id} name={nameRU} url={image.url} duration={duration} />
        ) : null))}
      </ul>
      <Button className="movies-card-list__more">Ещё</Button>
    </section>
  );
}

export default MoviesCardList;
