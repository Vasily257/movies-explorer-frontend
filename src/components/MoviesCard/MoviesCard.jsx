import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import CustomLink from '../CustomLink/CustomLink';

import { BASE_URL } from '../../utils/scripts/constants';
import { getHoursAndMinutes } from '../../utils/scripts/utils';

import './MoviesCard.css';

function MoviesCard({
  name, imageUrl, duration, trailerLink, isSavedMovies,
}) {
  const [isSavedCard, setIsSavedCard] = useState(false);

  const { hours, minutes } = getHoursAndMinutes(duration);

  return (
    <li className="movies-card">
      <CustomLink className="movies-card__link" path={trailerLink}>
        <img
          className="movies-card__image"
          src={`${BASE_URL.BEATFILM_MOVIES}${imageUrl}`}
          alt="Постер фильма"
        />
      </CustomLink>
      <div className="movies-card__info">
        <p className="movies-card__name">{name}</p>
        {isSavedMovies ? (
          <Button className="movies-card__button movies-card__button_type_delete" />
        ) : (
          <Button
            className={`movies-card__button movies-card__button_type_save ${
              isSavedCard ? 'movies-card__button_active' : ''
            }`}
            onClick={() => {
              setIsSavedCard(!isSavedCard);
            }}
          />
        )}
        <p className="movies-card__duration">
          {hours === 0 ? `${minutes}м` : `${hours}ч${minutes}м`}
        </p>
      </div>
    </li>
  );
}

MoviesCard.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  trailerLink: PropTypes.string.isRequired,
  isSavedMovies: PropTypes.bool,
};

MoviesCard.defaultProps = {
  isSavedMovies: false,
};

export default MoviesCard;
