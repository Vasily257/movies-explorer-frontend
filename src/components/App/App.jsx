import {
  React, useState, useMemo, useEffect, useCallback,
} from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginContext from '../../contexts/LoginContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import SavedMoviesContext from '../../contexts/SavedMoviesContext';

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

import {
  localMovies,
  localQuery,
  localIsShortsMovies,
} from '../../utils/scripts/utils';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '', _id: '' });
  const [savedMovies, setSavedMovies] = useState([]);

  const [displayedData, setDisplayedData] = useState({
    searchQuery: localQuery,
    displayedMovies: localMovies,
    isShortsMovies: localIsShortsMovies,
    errorText: '',
  });

  const loginValue = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);
  const currentUserValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  );
  const savedMoviesValue = useMemo(
    () => ({ savedMovies, setSavedMovies }),
    [savedMovies, setSavedMovies],
  );

  const setUserInfo = useCallback(
    async (token) => {
      const userData = await getUserData(token);
      const savedMoviesFromServer = await getSavedMovies();
      setCurrentUser({ name: userData.name, email: userData.email, _id: userData._id });
      setSavedMovies(savedMoviesFromServer);
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
          setSavedMovies((prevSavedMovies) => (
            prevSavedMovies.filter((savedMovie) => (
              savedMovie.movieId !== deletedSavedMovie.movieId
            ))
          ));
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

    setCurrentUser({ name: '', email: '', _id: '' });
    setSavedMovies([]);
    setIsLoggedIn(false);
  }, [setCurrentUser, setSavedMovies, setIsLoggedIn]);

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
          <SavedMoviesContext.Provider value={savedMoviesValue}>
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
                      displayedData={displayedData}
                      setDisplayedData={setDisplayedData}
                      onAddSavedMovie={onAddSavedMovie}
                      onDeleteSavedMovie={onDeleteSavedMovie}
                    />
                  </ProtectedRoute>
                )}
              />
              <Route
                path="/saved-movies"
                element={(
                  <ProtectedRoute>
                    <SavedMovies
                      displayedData={displayedData}
                      setDisplayedData={setDisplayedData}
                      onDeleteSavedMovie={onDeleteSavedMovie}
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
          </SavedMoviesContext.Provider>
        </CurrentUserContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
