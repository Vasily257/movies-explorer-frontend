import { React, useState } from 'react';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

import getMoviesFromBase from '../../utils/scripts/MoviesApi';

function Movies() {
  const [movies, setMovies] = useState([]);

  const setMoviesFromBase = async () => {
    const moviesFromBase = await getMoviesFromBase();
    setMovies(moviesFromBase);
  };

  return (
    <>
      <Header />
      <Content>
        <SearchForm handleSubmit={setMoviesFromBase} />
        <MoviesCardList moviesList={movies} />
      </Content>
      <Footer />
    </>
  );
}

export default Movies;
