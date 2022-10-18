import {
  React, useState, useMemo, useEffect, useCallback,
} from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginContext from '../../contexts/LoginContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import DisplayedDataContext from '../../contexts/DisplayedDataContext';

import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';
import ProtectedRoute from '../HOC/ProtectedRoute';
import UnprotectedRoute from '../HOC/UnprotectedRoute';

import {
  addSavedMovie,
  deleteSavedMovie,
  getUserData,
  getSavedMovies,
} from '../../utils/scripts/MainApi';

import './App.css';

function App() {
  const [savedMovies, setSavedMovies] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });
  const [displayedData, setDisplayedData] = useState({
    searchQuery: localStorage.getItem('query') || '',
    displayedMovies: JSON.parse(localStorage.getItem('moviesFromBeatfilm')) || [],
    isShortsMovies: JSON.parse(localStorage.getItem('isShortsMovies')) || false,
    errorText: '',
  });

  const loginValue = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);
  const currentUserValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  );
  const displayedDataValue = useMemo(
    () => ({ displayedData, setDisplayedData }),
    [displayedData, setDisplayedData],
  );

  const setUserInfo = useCallback(
    async (token) => {
      const userData = await getUserData(token);
      const savedMoviesFromServer = await getSavedMovies();
      setCurrentUser({ name: userData.name, email: userData.email, _id: userData._id });
      setSavedMovies(savedMoviesFromServer.sort((prev, next) => prev.movieId - next.movieId));
      setIsLoggedIn(true);
    },
    [setCurrentUser, setSavedMovies, setIsLoggedIn],
  );

  const onAddSavedMovie = useCallback(
    async (movie) => {
      try {
        const addedSavedMovie = await addSavedMovie(movie);
        if (addedSavedMovie) {
          setSavedMovies([{ ...addedSavedMovie, key: addedSavedMovie.id }, ...savedMovies]);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [savedMovies, setSavedMovies],
  );

  const onDeleteSavedMovie = useCallback(
    async (id) => {
      try {
        const deletedSavedMovie = await deleteSavedMovie(id);
        if (deletedSavedMovie) {
          setSavedMovies((prevSavedMovies) => prevSavedMovies
            .filter((savedMovie) => savedMovie.movieId !== deletedSavedMovie.movieId)
            .sort((prev, next) => prev.movieId - next.movieId));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    },
    [setSavedMovies],
  );

  const onSignOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('query');
    localStorage.removeItem('isShortsMovies');

    setDisplayedData({
      searchQuery: '',
      displayedMovies: [],
      isShortsMovies: false,
      errorText: '',
    });
    setCurrentUser({ name: '', email: '', _id: '' });
    setSavedMovies([]);
    setIsLoggedIn(false);
  }, []);

  useEffect(() => {
    async function checkToken() {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          await setUserInfo(token);
        }
      } catch (error) {
        onSignOut();
      }
    }
    checkToken();
  }, [setCurrentUser, setSavedMovies, setIsLoggedIn, onSignOut, setUserInfo]);

  return (
    <div className="app">
      <LoginContext.Provider value={loginValue}>
        <CurrentUserContext.Provider value={currentUserValue}>
          <DisplayedDataContext.Provider value={displayedDataValue}>
            <Routes>
              <Route
                path="/"
                element={(
                  <UnprotectedRoute>
                    <Main />
                  </UnprotectedRoute>
              )}
              />
              <Route
                path="/movies"
                element={(
                  <ProtectedRoute>
                    <Movies
                      savedMovies={savedMovies}
                      onAddSavedMovie={onAddSavedMovie}
                      onDeleteSavedMovie={onDeleteSavedMovie}
                      onSignOut={onSignOut}
                    />
                  </ProtectedRoute>
              )}
              />
              <Route
                path="/saved-movies"
                element={(
                  <ProtectedRoute>
                    <SavedMovies
                      savedMovies={savedMovies}
                      onDeleteSavedMovie={onDeleteSavedMovie}
                      onSignOut={onSignOut}
                    />
                  </ProtectedRoute>
              )}
              />
              <Route
                path="/profile"
                element={(
                  <ProtectedRoute>
                    <Profile onSignOut={onSignOut} />
                  </ProtectedRoute>
              )}
              />
              <Route
                path="/signin"
                element={(
                  <UnprotectedRoute>
                    <Login setUserInfo={setUserInfo} />
                  </UnprotectedRoute>
              )}
              />
              <Route
                path="/signup"
                element={(
                  <UnprotectedRoute>
                    <Register />
                  </UnprotectedRoute>
              )}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </DisplayedDataContext.Provider>
        </CurrentUserContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
