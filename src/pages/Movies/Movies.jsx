import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import Preloader from '../../components/Preloader/Preloader';
import Content from '../../components/Content/Content';

function Movies({ isShortsMovies, setIsShortsMovies }) {
  return (
    <>
      <Header />
      <Content>
        <SearchForm isShortsMovies={isShortsMovies} setIsShortsMovies={setIsShortsMovies} />
        <MoviesCardList />
      </Content>
      <Footer />
      <Preloader />
    </>
  );
}

Movies.propTypes = {
  isShortsMovies: PropTypes.bool.isRequired,
  setIsShortsMovies: PropTypes.func.isRequired,
};

export default Movies;
