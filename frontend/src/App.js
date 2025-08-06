// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashobard/index';
import CreateRole from './pages/CreateRole';
import CreateUser from './pages/CreateUser';
import ProtectedRoute from './components/ProtectedRoute';
import RolePermissionsEditor from './pages/EditRole';
import Navbar from './pages/NavBar';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { user } = useAuth(); // user from context

  return (
    <Routes>
      {/* Redirect root path based on auth status */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
      />
      <Route
        path="/create-role"
        element={<ProtectedRoute><CreateRole /></ProtectedRoute>}
      />
      <Route
        path="/create-user"
        element={<ProtectedRoute><CreateUser /></ProtectedRoute>}
      />
      <Route
        path="/edit-role"
        element={<ProtectedRoute><RolePermissionsEditor /></ProtectedRoute>}
      />
    </Routes>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
};

export default App;
