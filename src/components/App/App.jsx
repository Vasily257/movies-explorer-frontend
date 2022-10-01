import { React, useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';

import { LoginContext } from '../../contexts/LoginContext';
import { MenuContext } from '../../contexts/MenuContext';
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

import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: 'Василий', email: 'pochta@yandex.ru' });

  const loginValue = useMemo(() => ({ isLoggedIn, setIsLoggedIn }), [isLoggedIn, setIsLoggedIn]);
  const menuValue = useMemo(() => ({ isMenuOpen, setIsMenuOpen }), [isMenuOpen, setIsMenuOpen]);
  const currentUserValue = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser],
  );

  return (
    <div className="app">
      <LoginContext.Provider value={loginValue}>
        <MenuContext.Provider value={menuValue}>
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
        </MenuContext.Provider>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
