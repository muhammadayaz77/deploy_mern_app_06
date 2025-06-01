// ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ allowedRoles }) => {
  const currentUser = useSelector(store => store.auth?.user);
  const loading = useSelector(store => store.auth?.loading); // Add loading state from Redux

  console.log('Current User:', currentUser);
  console.log('Loading State:', loading);

  if (loading) {
    return <h1>Loading...</h1>; // Or your loading spinner
  }

  if (!currentUser) {
    return <Navigate to="/web/login" replace />;
  }

  // If specific roles are required but user doesn't have them
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/web/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;