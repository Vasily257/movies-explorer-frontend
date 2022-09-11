import { React, useState, useMemo } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Main from '../../pages/Main/Main';
import Movies from '../../pages/Movies/Movies';
import SavedMovies from '../../pages/SavedMovies/SavedMovies';
import Profile from '../../pages/Profile/Profile';
import Login from '../../pages/Login/Login';
import Register from '../../pages/Register/Register';

import { MenuContext } from '../../contexts/MenuContext';

function App() {
  const [isLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuValue = useMemo(() => ({ isMenuOpen, setIsMenuOpen }), [isMenuOpen, setIsMenuOpen]);

  return (
    <div className="app">
      <MenuContext.Provider value={menuValue}>
        <Routes>
          <Route
            path="/"
            element={(
              <Main
                isLoggedIn={isLoggedIn}
              />
)}
          />
          <Route path="/movies" element={<Movies />} />
          <Route path="/saved-movies" element={<SavedMovies />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/signup" element={<Register />} />
        </Routes>

      </MenuContext.Provider>
    </div>
  );
}

export default App;
