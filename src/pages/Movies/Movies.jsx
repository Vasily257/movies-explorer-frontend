import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';
import Footer from '../../components/Footer/Footer';

import getMoviesFromBase from '../../utils/scripts/MoviesApi';
import { MOVIES_ERROR_TEXT } from '../../utils/scripts/constants';
import { localMovies, localQuery, localIsShortsMovies } from '../../utils/scripts/utils';

function Movies({ onAddSavedMovie, onDeleteSavedMovie }) {
  const [searchQuery, setSearchQuery] = useState(localQuery);
  const [movies, setMovies] = useState(localMovies);
  const [isShortsMovies, setIsShortsMovies] = useState(localIsShortsMovies);

  const [isProladerShown, setIsProladerShown] = useState(false);
  const [errorText, setErrorText] = useState('');

  const setMoviesFromBase = useCallback(async () => {
    setIsProladerShown(true);

    try {
      const moviesFromBase = await getMoviesFromBase();
      localStorage.setItem('moviesFromBase', JSON.stringify(moviesFromBase));

      setMovies(moviesFromBase);
      setErrorText('');
    } catch (error) {
      setMovies([]);
      setErrorText(MOVIES_ERROR_TEXT.FETCH_FAILED);
    }

    setIsProladerShown(false);
  });

  return (
    <>
      <Header />
      <Content>
        <SearchForm
          setSearchQuery={setSearchQuery}
          setMoviesFromBase={setMoviesFromBase}
          isShortsMovies={isShortsMovies}
          setIsShortsMovies={setIsShortsMovies}
        />
        {isProladerShown ? (
          <Preloader />
        ) : (
          <MoviesCardList
            searchQuery={searchQuery}
            moviesList={movies}
            queryErrorText={errorText}
            isShortsMovies={isShortsMovies}
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
  onAddSavedMovie: PropTypes.func.isRequired,
  onDeleteSavedMovie: PropTypes.func.isRequired,
};

export default Movies;
