import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct imports
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';

const App = () => {

  return (
    <Router>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route 
            path="/dashboard" 
            element={<ProtectedRoute element={<Dashboard />} />} 
          />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
