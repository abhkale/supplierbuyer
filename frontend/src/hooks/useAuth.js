import { useState, useEffect } from 'react';
import { getStoredUser } from '../services/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const isAuthenticated = !!user;
  const isSupplier = user?.role === 'supplier';
  const isBuyer = user?.role === 'buyer';

  return { user, isAuthenticated, isSupplier, isBuyer, loading, setUser };
};
