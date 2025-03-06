import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { auth } = useSelector((state) => state);

  const isAuthorized = auth.user && allowedRoles.includes(auth.user.role);

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
