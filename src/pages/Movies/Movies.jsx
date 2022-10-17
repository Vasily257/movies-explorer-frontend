import React, {
  useState, useCallback, useContext,
} from 'react';
import PropTypes from 'prop-types';

import DisplayedDataContext from '../../contexts/DisplayedDataContext';

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
  savedMovies, onAddSavedMovie, onDeleteSavedMovie, onSignOut,
}) {
  const { setDisplayedData } = useContext(DisplayedDataContext);
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
        displayedMovies: validatedMoviesFromBeatfilm,
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

  return (
    <>
      <Header onSignOut={onSignOut} />
      <Content>
        <SearchForm setMoviesFromBeatfilm={setMoviesFromBeatfilm} />
        {isProladerShown ? (
          <Preloader />
        ) : (
          <MoviesCardList
            savedMovies={savedMovies}
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
  onAddSavedMovie: PropTypes.func.isRequired,
  onDeleteSavedMovie: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

Movies.defaultProps = {
  savedMovies: [],
};

export default Movies;
