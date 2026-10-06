import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const THEME_STORAGE_KEY = 'movie_explorer_theme_mode';

const ThemeContext = createContext(null);

const getInitialThemeMode = () => {
  try {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved === 'light' || saved === 'dark') {
      return saved;
    }
  } catch (err) {
    console.warn('Failed to read theme preference from localStorage:', err);
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  return 'dark';
};

export const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState(getInitialThemeMode);

  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (err) {
      console.warn('Failed to save theme mode to localStorage:', err);
    }
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  }, []);

  const theme = useMemo(() => {
    const isDark = mode === 'dark';

    // Cinematic palette: warm near-black neutrals + single muted amber accent
    const bgDefault = isDark ? '#0E0E0F' : '#F6F4EF';
    const bgPaper = isDark ? '#17171A' : '#EFECE5';
    const accent = isDark ? '#E0A526' : '#C48B1C';
    const textPrimary = isDark ? '#F2F1ED' : '#141416';
    const textSecondary = isDark ? '#9E9CA3' : '#636166';
    const borderColor = isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.08)';

    return createTheme({
      palette: {
        mode,
        primary: {
          main: accent,
          contrastText: isDark ? '#0E0E0F' : '#FFFFFF',
        },
        background: {
          default: bgDefault,
          paper: bgPaper,
        },
        text: {
          primary: textPrimary,
          secondary: textSecondary,
        },
        divider: borderColor,
      },
      typography: {
        fontFamily: ['"DM Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'].join(','),
        h1: {
          fontFamily: ['"Instrument Serif"', 'Georgia', 'serif'].join(','),
          fontWeight: 400,
          letterSpacing: '-0.02em',
        },
        h2: {
          fontFamily: ['"Instrument Serif"', 'Georgia', 'serif'].join(','),
          fontWeight: 400,
          letterSpacing: '-0.015em',
        },
        h3: {
          fontFamily: ['"Instrument Serif"', 'Georgia', 'serif'].join(','),
          fontWeight: 400,
          letterSpacing: '-0.01em',
        },
        h4: {
          fontFamily: ['"Instrument Serif"', 'Georgia', 'serif'].join(','),
          fontWeight: 400,
          letterSpacing: '-0.01em',
        },
        h5: {
          fontFamily: ['"Instrument Serif"', 'Georgia', 'serif'].join(','),
          fontWeight: 400,
        },
        h6: {
          fontFamily: ['"DM Sans"', 'sans-serif'].join(','),
          fontWeight: 600,
          letterSpacing: '-0.01em',
        },
        overline: {
          fontFamily: ['"DM Sans"', 'sans-serif'].join(','),
          fontWeight: 600,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          fontSize: '0.75rem',
        },
        button: {
          fontFamily: ['"DM Sans"', 'sans-serif'].join(','),
          fontWeight: 600,
          letterSpacing: '0.02em',
        },
      },
      shape: {
        borderRadius: 4, // Clean 4px minimal radius
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              backgroundColor: bgDefault,
              color: textPrimary,
              scrollbarColor: isDark ? '#26262B #0E0E0F' : '#DEDBD3 #F6F4EF',
              '&::-webkit-scrollbar': {
                width: 8,
                height: 8,
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: isDark ? '#26262B' : '#DEDBD3',
                borderRadius: 4,
              },
            },
            '@media (prefers-reduced-motion: reduce)': {
              '*': {
                animationDuration: '0.01ms !important',
                animationIterationCount: '1 !important',
                transitionDuration: '0.01ms !important',
                scrollBehavior: 'auto !important',
              },
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
              backgroundColor: bgDefault,
              borderBottom: `1px solid ${borderColor}`,
              color: textPrimary,
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              boxShadow: 'none',
              borderRadius: 4,
              backgroundColor: 'transparent',
              backgroundImage: 'none',
            },
          },
        },
        MuiButton: {
          styleOverrides: {
            root: {
              textTransform: 'none',
              borderRadius: 4,
              boxShadow: 'none',
              fontWeight: 500,
              '&:hover': {
                boxShadow: 'none',
              },
            },
            containedPrimary: {
              backgroundColor: accent,
              color: isDark ? '#0E0E0F' : '#FFFFFF',
              '&:hover': {
                backgroundColor: isDark ? '#c8921f' : '#b07c16',
                boxShadow: 'none',
              },
            },
            outlined: {
              borderColor,
              color: textPrimary,
              '&:hover': {
                borderColor: accent,
                backgroundColor: isDark ? 'rgba(224, 165, 38, 0.08)' : 'rgba(196, 139, 28, 0.08)',
              },
            },
          },
        },
        MuiChip: {
          styleOverrides: {
            root: {
              borderRadius: 16,
              fontWeight: 500,
              fontSize: '0.8125rem',
            },
            outlined: {
              borderColor,
            },
          },
        },
        MuiOutlinedInput: {
          styleOverrides: {
            root: {
              borderRadius: 4,
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor,
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: accent,
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: accent,
                borderWidth: 1,
              },
            },
          },
        },
      },
    });
  }, [mode]);

  const contextValue = useMemo(
    () => ({
      mode,
      toggleTheme,
    }),
    [mode, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeContextProvider');
  }
  return context;
};

export default ThemeContext;
