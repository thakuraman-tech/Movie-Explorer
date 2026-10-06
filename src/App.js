import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { AuthProvider } from './context/AuthContext';
import { ThemeContextProvider } from './context/ThemeContext';
import { MovieProvider } from './context/MovieContext';

import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import Home from './pages/Home';
import MovieDetailsPage from './pages/MovieDetailsPage';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

/**
 * Root Application:
 * Editorial cinema application layout with global providers and client-side routing.
 */
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeContextProvider>
          <MovieProvider>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: 'background.default',
                color: 'text.primary',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
            >
              {/* Minimal Editorial Navbar */}
              <Navbar />

              {/* Views */}
              <Box component="main" sx={{ flexGrow: 1 }}>
                <Routes>
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Home />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/movie/:id"
                    element={
                      <ProtectedRoute>
                        <MovieDetailsPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/favorites"
                    element={
                      <ProtectedRoute>
                        <Favorites />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Box>

              {/* Minimal Understated Footer */}
              <Box
                component="footer"
                sx={{
                  py: 3,
                  px: 2,
                  mt: 'auto',
                  borderTop: 1,
                  borderColor: 'divider',
                  textAlign: 'center',
                }}
              >
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  Movie Explorer &bull; Data provided by{' '}
                  <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    TMDb
                  </a>
                </Typography>
              </Box>
            </Box>
          </MovieProvider>
        </ThemeContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
