import React from 'react';

import Header from '../../components/Header/Header';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';
import Preloader from '../../components/Preloader/Preloader';
import Content from '../../components/Content/Content';

function Movies() {
  return (
    <>
      <Header />
      <Content>
        <SearchForm />
        <MoviesCardList />
      </Content>
      <Footer />
      <Preloader />
    </>
  );
}

export default Movies;
