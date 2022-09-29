import { React, useState, useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';
import NotFound from '../../pages/NotFound/NotFound';

import { LoginContext } from '../../contexts/LoginContext';
import { MenuContext } from '../../contexts/MenuContext';
import CurrentUserContext from '../../contexts/CurrentUserContext';

import ProtectedRoute from '../HOC/ProtectedRoute';

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
              <Route path="/" element={!isLoggedIn ? <Main /> : <Navigate to="/movies" />} />
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
              <Route path="/signin" element={!isLoggedIn ? <Login /> : <Navigate to="/movies" />} />
              <Route
                path="/signup"
                element={!isLoggedIn ? <Register /> : <Navigate to="/movies" />}
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
