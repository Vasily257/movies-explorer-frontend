import { createContext } from 'react';

const SavedMoviesContext = createContext({
  savedMovies: [],
  setSavedMovies: () => {},
});

export default SavedMoviesContext;
