import {
  React, useState, useMemo, useEffect,
} from 'react';
import { Routes, Route } from 'react-router-dom';

import LoginContext from '../../contexts/LoginContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';
import ProtectedRoute from '../HOC/ProtectedRoute';
import UnprotectedRoute from '../HOC/UnprotectedRoute';

import { getContent } from '../../utils/scripts/MainApi';

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: '', email: '' });

  const loginValue = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);
  const currentUserValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  );

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const userData = await getContent(token);
          setCurrentUser({ name: userData.name, email: userData.email });
          setIsLoggedIn(true);
        }
      } catch (error) {
        // Удалять данные, если токен неправильный?
        console.log(error);
      }
    };

    checkToken();
  }, []);

  return (
    <div className="app">
      <LoginContext.Provider value={loginValue}>
        <CurrentUserContext.Provider value={currentUserValue}>
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
                  <Movies />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/saved-movies"
              element={(
                <ProtectedRoute>
                  <SavedMovies />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/profile"
              element={(
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              )}
            />
            <Route
              path="/signin"
              element={(
                <UnprotectedRoute>
                  <Login />
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
        </CurrentUserContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
