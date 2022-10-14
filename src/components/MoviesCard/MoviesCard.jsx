import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Button from '../Button/Button';
import CustomLink from '../CustomLink/CustomLink';

import { getHoursAndMinutes } from '../../utils/scripts/utils';

import './MoviesCard.css';

function MoviesCard({
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
  isSavedMovies,
  savedMovies,
  onAddSavedMovie,
  onDeleteSavedMovie,
}) {
  const [isSavedCard, setIsSavedCard] = useState(false);
  const { hours, minutes } = getHoursAndMinutes(duration);

  function handleAddingClick() {
    onAddSavedMovie({
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
    });
  }

  function handleDeletingClick() {
    const deletedMovie = savedMovies.find((savedMovie) => savedMovie.movieId === movieId);
    if (deletedMovie) {
      onDeleteSavedMovie(deletedMovie._id);
    }
  }

  useEffect(() => {
    if (
      savedMovies.some((savedMovie) => (
        savedMovie.movieId === movieId
      ))
    ) {
      setIsSavedCard(true);
    } else {
      setIsSavedCard(false);
    }
  }, [savedMovies]);

  return (
    <li className="movies-card">
      <CustomLink className="movies-card__link" path={trailerLink}>
        <img className="movies-card__image" src={image} alt="Постер фильма" />
      </CustomLink>
      <div className="movies-card__info">
        <p className="movies-card__name">{nameRU}</p>
        {isSavedMovies ? (
          <Button
            className="movies-card__button movies-card__button_type_saved"
            onClick={() => {
              handleAddingClick();
            }}
          />
        ) : (
          <Button
            className={`movies-card__button  ${
              !isSavedCard ? 'movies-card__button_type_not-added' : 'movies-card__button_type_added'
            }`}
            onClick={
              !isSavedCard
                ? () => {
                  handleAddingClick();
                }
                : () => {
                  handleDeletingClick();
                }
            }
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
  country: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  trailerLink: PropTypes.string.isRequired,
  nameRU: PropTypes.string.isRequired,
  nameEN: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  movieId: PropTypes.number.isRequired,
  isSavedMovies: PropTypes.bool,
  savedMovies: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ),
  onAddSavedMovie: PropTypes.func,
  onDeleteSavedMovie: PropTypes.func,
};

MoviesCard.defaultProps = {
  isSavedMovies: false,
  savedMovies: [],
  onAddSavedMovie: () => {},
  onDeleteSavedMovie: () => {},
};

export default MoviesCard;
