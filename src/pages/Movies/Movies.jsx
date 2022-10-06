import React, { useState } from 'react';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';
import Footer from '../../components/Footer/Footer';

import getMoviesFromBase from '../../utils/scripts/MoviesApi';
import { ERROR_TEXT } from '../../utils/scripts/constants';

function Movies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [isShortsMovies, setIsShortsMovies] = useState(false);

  const [isProladerShown, setIsProladerShown] = useState(false);
  const [errorText, setErrorText] = useState('');

  const setMoviesFromBase = async () => {
    setIsProladerShown(true);
    try {
      const moviesFromBase = await getMoviesFromBase();
      setMovies(moviesFromBase);
      setErrorText('');
    } catch (error) {
      setMovies([]);
      setErrorText(ERROR_TEXT.FAILED_FETCH);
    }

    setIsProladerShown(false);
  };

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
          />
        )}
      </Content>
      <Footer />
    </>
  );
}

export default Movies;
