import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';
import Footer from '../../components/Footer/Footer';

import { MOVIES_ERROR_TEXT } from '../../utils/scripts/constants';
import { bringMoviesToSingleView, validateMovies } from '../../utils/scripts/utils';
import getMoviesFromBeatfilm from '../../utils/scripts/MoviesApi';

function Movies({
  savedMovies,
  displayedData,
  setDisplayedData,
  onAddSavedMovie,
  onDeleteSavedMovie,
  onSignOut,
}) {
  const [isProladerShown, setIsProladerShown] = useState(false);

  const setMoviesFromBeatfilm = useCallback(async () => {
    setIsProladerShown(true);

    try {
      const moviesFromBeatfilm = await getMoviesFromBeatfilm();
      const convertedMoviesFromBeatfilm = bringMoviesToSingleView(moviesFromBeatfilm);
      const validatedMoviesFromBeatfilm = validateMovies(convertedMoviesFromBeatfilm);

      localStorage.setItem('moviesFromBeatfilm', JSON.stringify(validatedMoviesFromBeatfilm));
      setDisplayedData((prevData) => ({
        ...prevData,
        allMovies: validatedMoviesFromBeatfilm,
        queryErrorText: '',
      }));
    } catch (error) {
      setDisplayedData((prevData) => ({
        ...prevData,
        allMovies: [],
        queryErrorText: MOVIES_ERROR_TEXT.FETCH_FAILED,
      }));
    }

    setIsProladerShown(false);
  }, [setDisplayedData]);

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('moviesFromBeatfilm'));
    setDisplayedData((prevData) => ({
      ...prevData,
      allMovies: localMovies || [],
    }));
  }, [setDisplayedData]);

  return (
    <>
      <Header onSignOut={onSignOut} />
      <Content>
        <SearchForm
          displayedData={displayedData}
          setDisplayedData={setDisplayedData}
          setMoviesFromBeatfilm={setMoviesFromBeatfilm}
        />
        {isProladerShown ? (
          <Preloader />
        ) : (
          <MoviesCardList
            savedMovies={savedMovies}
            displayedData={displayedData}
            onAddSavedMovie={onAddSavedMovie}
            onDeleteSavedMovie={onDeleteSavedMovie}
          />
        )}
      </Content>
      <Footer />
    </>
  );
}

Movies.propTypes = {
  savedMovies: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ),
  displayedData: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
      PropTypes.arrayOf(
        PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
      ),
    ]),
  ).isRequired,
  setDisplayedData: PropTypes.func.isRequired,
  onAddSavedMovie: PropTypes.func.isRequired,
  onDeleteSavedMovie: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

Movies.defaultProps = {
  savedMovies: [],
};

export default Movies;
