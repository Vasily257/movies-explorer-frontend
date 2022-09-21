import React from 'react';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import Preloader from '../../components/Preloader/Preloader';

function SavedMovies() {
  return (
    <>
      <Header />
      <Content>
        <SearchForm />
        <MoviesCardList isSavedMovies />
      </Content>
      <Footer />
      <Preloader />
    </>
  );
}

export default SavedMovies;
