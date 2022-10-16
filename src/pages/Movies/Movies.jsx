import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';
import Footer from '../../components/Footer/Footer';

import getMoviesFromBase from '../../utils/scripts/MoviesApi';
import { MOVIES_ERROR_TEXT } from '../../utils/scripts/constants';
import { validateMovies, localMovies } from '../../utils/scripts/utils';

function Movies({
  displayedData, setDisplayedData, onAddSavedMovie, onDeleteSavedMovie,
}) {
  const [isProladerShown, setIsProladerShown] = useState(false);

  const setMoviesFromBase = useCallback(async () => {
    setIsProladerShown(true);

    try {
      const moviesFromBase = await getMoviesFromBase();
      const validatedMoviesFromBase = validateMovies(moviesFromBase);
      localStorage.setItem('moviesFromBase', JSON.stringify(validatedMoviesFromBase));
      setDisplayedData((prevData) => ({
        ...prevData,
        displayedMovies: validatedMoviesFromBase,
        queryErrorText: '',
      }));
    } catch (error) {
      setDisplayedData((prevData) => ({
        ...prevData,
        displayedMovies: [],
        queryErrorText: MOVIES_ERROR_TEXT.FETCH_FAILED,
      }));
    }

    setIsProladerShown(false);
  }, [setDisplayedData]);

  useEffect(() => {
    setDisplayedData((prevData) => ({ ...prevData, displayedMovies: localMovies }));
  }, [setDisplayedData]);

  return (
    <>
      <Header />
      <Content>
        <SearchForm
          displayedData={displayedData}
          setDisplayedData={setDisplayedData}
          setMoviesFromBase={setMoviesFromBase}
        />
        {isProladerShown ? (
          <Preloader />
        ) : (
          <MoviesCardList
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
};

export default Movies;
