import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import DisplayedDataContext from '../../contexts/DisplayedDataContext';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

function SavedMovies({ savedMovies, onDeleteSavedMovie, onSignOut }) {
  const { setDisplayedData } = useContext(DisplayedDataContext);

  useEffect(() => {
    setDisplayedData((prevData) => ({ ...prevData, displayedMovies: savedMovies }));
  }, [savedMovies, setDisplayedData]);

  return (
    <>
      <Header onSignOut={onSignOut} />
      <Content>
        <SearchForm setDisplayedData={setDisplayedData} />
        <MoviesCardList isSavedMovies onDeleteSavedMovie={onDeleteSavedMovie} />
      </Content>
      <Footer />
    </>
  );
}

SavedMovies.propTypes = {
  savedMovies: PropTypes.arrayOf(
    PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  ),
  onDeleteSavedMovie: PropTypes.func.isRequired,
  onSignOut: PropTypes.func.isRequired,
};

SavedMovies.defaultProps = {
  savedMovies: [],
};

export default SavedMovies;
