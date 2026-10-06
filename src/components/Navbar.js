import React, { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Minimal icons
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';

import { useAuth } from '../context/AuthContext';
import { useAppTheme } from '../context/ThemeContext';
import { useMovie } from '../context/MovieContext';

/**
 * Slim, editorial Navbar:
 * - Text-only serif wordmark
 * - Inline expandable search bar
 * - Clean text navigation links
 * - Theme toggle and session controls
 */
const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { mode, toggleTheme } = useAppTheme();
  const { favorites, lastQuery, setLastQuery } = useMovie();
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));

  // Expandable inline search on navbar (when on non-home pages or mobile)
  const [searchOpen, setSearchOpen] = useState(false);
  const [navSearchText, setNavSearchText] = useState(lastQuery || '');
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);

  const handleNavSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearchText.trim()) {
      setLastQuery(navSearchText.trim());
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  };

  const handleLogout = () => {
    setMobileMenuAnchor(null);
    logout();
    navigate('/login');
  };

  const favoritesCount = favorites?.length || 0;

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: 'background.default',
        borderBottom: 1,
        borderColor: 'divider',
        transition: 'background-color 0.2s ease',
      }}
    >
      <Toolbar
        variant="dense"
        sx={{
          minHeight: 56,
          px: { xs: 2, md: 4 },
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Serif Wordmark */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <Typography
            component={RouterLink}
            to="/"
            variant="h5"
            sx={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: { xs: '1.45rem', sm: '1.75rem' },
              fontWeight: 400,
              letterSpacing: '-0.02em',
              textDecoration: 'none',
              color: 'text.primary',
              lineHeight: 1,
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Movie Explorer
          </Typography>

          {/* Desktop Navigation Links */}
          {isAuthenticated && !isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, ml: 2 }}>
              <Button
                component={RouterLink}
                to="/"
                color="inherit"
                size="small"
                sx={{
                  color: location.pathname === '/' ? 'text.primary' : 'text.secondary',
                  fontWeight: location.pathname === '/' ? 600 : 400,
                  fontSize: '0.875rem',
                }}
              >
                Explore
              </Button>

              <Button
                component={RouterLink}
                to="/favorites"
                color="inherit"
                size="small"
                sx={{
                  color: location.pathname === '/favorites' ? 'text.primary' : 'text.secondary',
                  fontWeight: location.pathname === '/favorites' ? 600 : 400,
                  fontSize: '0.875rem',
                }}
              >
                Saved {favoritesCount > 0 && `(${favoritesCount})`}
              </Button>
            </Box>
          )}
        </Box>

        {/* Right: Inline Search, Theme Switch, and User Account */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isAuthenticated && (
            <>
              {/* Expandable Inline Search Input */}
              {searchOpen ? (
                <Box
                  component="form"
                  onSubmit={handleNavSearchSubmit}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: 1,
                    borderColor: 'primary.main',
                    borderRadius: '4px',
                    px: 1,
                    py: 0.25,
                    backgroundColor: 'background.paper',
                  }}
                >
                  <InputBase
                    autoFocus
                    placeholder="Search titles..."
                    value={navSearchText}
                    onChange={(e) => setNavSearchText(e.target.value)}
                    sx={{
                      fontSize: '0.85rem',
                      width: { xs: 120, sm: 180 },
                      color: 'text.primary',
                    }}
                    inputProps={{ 'aria-label': 'Search movies' }}
                  />
                  <IconButton
                    size="small"
                    onClick={() => setSearchOpen(false)}
                    aria-label="Close search"
                    sx={{ p: 0.25 }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              ) : (
                <Tooltip title="Search movies">
                  <IconButton
                    size="small"
                    onClick={() => setSearchOpen(true)}
                    color="inherit"
                    aria-label="Open search input"
                  >
                    <SearchIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </>
          )}

          {/* Theme Mode Toggle Button */}
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton
              onClick={toggleTheme}
              color="inherit"
              size="small"
              aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
            >
              {mode === 'dark' ? (
                <LightModeOutlinedIcon fontSize="small" sx={{ color: 'primary.main' }} />
              ) : (
                <DarkModeOutlinedIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>

          {/* Auth Controls */}
          {isAuthenticated ? (
            isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  size="small"
                  aria-label="Open navigation menu"
                  onClick={(e) => setMobileMenuAnchor(e.currentTarget)}
                >
                  <MenuOutlinedIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={mobileMenuAnchor}
                  open={Boolean(mobileMenuAnchor)}
                  onClose={() => setMobileMenuAnchor(null)}
                  PaperProps={{
                    sx: {
                      backgroundColor: 'background.paper',
                      border: 1,
                      borderColor: 'divider',
                      minWidth: 160,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    },
                  }}
                >
                  <MenuItem
                    component={RouterLink}
                    to="/"
                    onClick={() => setMobileMenuAnchor(null)}
                  >
                    Explore
                  </MenuItem>
                  <MenuItem
                    component={RouterLink}
                    to="/favorites"
                    onClick={() => setMobileMenuAnchor(null)}
                  >
                    Saved ({favoritesCount})
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <LogoutOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
                    Sign out ({user?.username})
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'text.secondary',
                    letterSpacing: '0.04em',
                    fontWeight: 500,
                  }}
                >
                  {user?.username}
                </Typography>
                <Tooltip title="Sign out">
                  <IconButton
                    onClick={handleLogout}
                    size="small"
                    color="inherit"
                    aria-label="Logout"
                  >
                    <LogoutOutlinedIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </Box>
            )
          ) : (
            <Button
              component={RouterLink}
              to="/login"
              variant="outlined"
              size="small"
              sx={{ ml: 1, fontSize: '0.8rem', py: 0.4 }}
            >
              Sign in
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
