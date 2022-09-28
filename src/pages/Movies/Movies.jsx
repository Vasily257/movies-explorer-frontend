import React from 'react';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

function Movies() {
  return (
    <>
      <Header />
      <Content>
        <SearchForm />
        <MoviesCardList />
      </Content>
      <Footer />
    </>
  );
}

export default Movies;
