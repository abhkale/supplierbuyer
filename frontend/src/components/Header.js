import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { logout } from '../services/authService';

const Header = () => {
  const { user, isAuthenticated, isSupplier, isBuyer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    // Store current path before navigating
    const currentPath = window.location.pathname;
    navigate('/login');
    // Only reload if we're not already on login page to ensure state is cleared
    if (currentPath !== '/login') {
      setTimeout(() => window.location.href = '/login', 100);
    }
  };

  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            SupplierBuyer
          </Link>

          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <span className="text-sm">
                  Welcome, <span className="font-semibold">{user.name}</span>
                </span>
                {isSupplier && (
                  <Link
                    to="/supplier/dashboard"
                    className="hover:text-primary-200 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {isBuyer && (
                  <Link
                    to="/buyer/dashboard"
                    className="hover:text-primary-200 transition"
                  >
                    Dashboard
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="bg-white text-primary-600 px-4 py-2 rounded hover:bg-primary-50 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:text-primary-200 transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-primary-600 px-4 py-2 rounded hover:bg-primary-50 transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
