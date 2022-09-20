import { React, useState } from 'react';
import PropTypes from 'prop-types';
import './MoviesCard.css';
import Button from '../Button/Button';

function MoviesCard({ name, url, duration }) {
  const [isSaved, setIsSaved] = useState(false);

  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;

  return (
    <li className="movies-card">
      <img
        className="movies-card__image"
        src={`https://api.nomoreparties.co${url}`}
        alt="Постер фильма"
      />
      <div className="movies-card__info">
        <p className="movies-card__name">{name}</p>
        <Button
          className={`movies-card__button ${isSaved ? 'movies-card__button_active' : ''}`}
          onClick={() => {
            setIsSaved(!isSaved);
          }}
        />
        <p className="movies-card__duration">
          {hours === 0 ? `${minutes}м` : `${hours}ч${minutes}м`}
        </p>
      </div>
    </li>
  );
}

MoviesCard.propTypes = {
  name: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
};

export default MoviesCard;
