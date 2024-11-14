// ProtectedRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../appwrite'; // Import isAuthenticated function

// ProtectedRoute component that checks if the user is authenticated
const ProtectedRoute = ({ element }) => {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await isAuthenticated();
      setIsAuth(!!session); // If session exists, user is authenticated
      setLoading(false); // Done with the loading check
    };

    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAuth) {
    return <Navigate to="/" />; // Redirect to SignIn page if not authenticated
  }

  return element; // Render the protected page if authenticated
};

export default ProtectedRoute;
