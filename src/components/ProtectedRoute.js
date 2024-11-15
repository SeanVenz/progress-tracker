import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/utils';

const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const session = isAuthenticated();
      setIsAuth(!!session); // Set isAuth based on whether session data exists
      setLoading(false); // Loading is complete
    };

    checkAuth();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Can display a loading spinner or similar component here
  }

  if (!isAuth) {
    return <Navigate to="/" replace />; // Redirect to SignIn page if not authenticated
  }

  return element; // Render the protected page if authenticated
};

export default ProtectedRoute;
