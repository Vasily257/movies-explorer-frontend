import { React, useContext } from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import LoginContext from '../../contexts/LoginContext';

import { BASE_URL } from '../../utils/scripts/constants';

function RouteForAnonymous({ children }) {
  const { isLoggedIn } = useContext(LoginContext);

  return !isLoggedIn ? children : <Navigate to={`${BASE_URL.MOVIES_EXPLORER_FRONT}/movies`} />;
}

RouteForAnonymous.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteForAnonymous;
