import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { auth } = useSelector((state) => state);
  const jwt = localStorage.getItem("jwt");

  if (!jwt || !auth.user) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute; 