import React, { useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

import SavedMoviesContext from '../../contexts/SavedMoviesContext';

import Header from '../../components/Header/Header';
import Content from '../../components/Content/Content';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Footer from '../../components/Footer/Footer';

function SavedMovies({ displayedData, setDisplayedData, onDeleteSavedMovie }) {
  const { savedMovies } = useContext(SavedMoviesContext);

  useEffect(() => {
    setDisplayedData((prevData) => ({ ...prevData, displayedMovies: savedMovies }));
  }, [savedMovies, setDisplayedData]);

  return (
    <>
      <Header />
      <Content>
        <SearchForm displayedData={displayedData} setDisplayedData={setDisplayedData} />
        <MoviesCardList
          isSavedMovies
          displayedData={displayedData}
          onDeleteSavedMovie={onDeleteSavedMovie}
        />
      </Content>
      <Footer />
    </>
  );
}

SavedMovies.propTypes = {
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
  onDeleteSavedMovie: PropTypes.func.isRequired,
};

export default SavedMovies;
