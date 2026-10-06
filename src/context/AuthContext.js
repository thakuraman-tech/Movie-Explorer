import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

/**
 * Storage key for persisting authentication session
 */
const AUTH_STORAGE_KEY = 'movie_explorer_auth_user';

const AuthContext = createContext(null);

/**
 * AuthProvider provides mock authentication state to the entire application.
 *
 * NOTE ON SECURITY:
 * This authentication implementation is strictly a client-side DEMO mock.
 * In a real production application, user credentials should NEVER be evaluated
 * against client-side environment variables or stored insecurely in client code.
 * Production apps must use a secure backend service with HTTPS, HTTP-only cookies/JWTs,
 * and standard authentication flows (e.g., OAuth 2.0 / OpenID Connect).
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore existing session from localStorage on initial load
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.username) {
          setUser(parsed);
        }
      }
    } catch (err) {
      console.warn('Failed to read auth state from localStorage:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Log in user by matching provided credentials with demo env variables.
   * @param {string} username
   * @param {string} password
   * @returns {{ success: boolean, message?: string }}
   */
  const login = useCallback((username, password) => {
    const demoUser = process.env.REACT_APP_DEMO_USER || 'demo';
    const demoPass = process.env.REACT_APP_DEMO_PASS || 'password123';

    const trimmedUser = (username || '').trim();
    const trimmedPass = (password || '').trim();

    if (!trimmedUser || !trimmedPass) {
      return { success: false, message: 'Username and password are required.' };
    }

    if (trimmedUser === demoUser && trimmedPass === demoPass) {
      const authenticatedUser = {
        username: trimmedUser,
        loggedInAt: new Date().toISOString(),
      };
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
      } catch (err) {
        console.warn('Failed to save auth session to localStorage:', err);
      }
      setUser(authenticatedUser);
      return { success: true };
    }

    return {
      success: false,
      message: 'Invalid username or password. Please check your credentials.',
    };
  }, []);

  /**
   * Clear session and log out the user
   */
  const logout = useCallback(() => {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (err) {
      console.warn('Failed to remove auth session from localStorage:', err);
    }
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook for accessing AuthContext
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
