import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { getGenres, checkConfiguration, isApiKeyMissing } from '../api/tmdb';

const FAVORITES_STORAGE_KEY = 'movie_explorer_favorites';
const LAST_QUERY_STORAGE_KEY = 'movie_explorer_last_search_query';

const MovieContext = createContext(null);

export const MovieProvider = ({ children }) => {
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.warn('Failed to load favorites from localStorage:', err);
      return [];
    }
  });

  // Initialize last searched query from localStorage
  const [lastQuery, setLastQueryState] = useState(() => {
    try {
      return localStorage.getItem(LAST_QUERY_STORAGE_KEY) || '';
    } catch (err) {
      console.warn('Failed to load last query from localStorage:', err);
      return '';
    }
  });

  // Cached list of genres from TMDb
  const [genres, setGenres] = useState([]);
  const [genresLoading, setGenresLoading] = useState(false);
  const [genresError, setGenresError] = useState(null);

  // Selected genre IDs for multi-select filtering
  const [selectedGenreIds, setSelectedGenreIds] = useState([]);

  // Startup health check state
  const [healthError, setHealthError] = useState(null);

  // Synchronize favorites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch (err) {
      console.warn('Failed to save favorites to localStorage:', err);
    }
  }, [favorites]);

  // Update and persist last search query
  const setLastQuery = useCallback((query) => {
    setLastQueryState(query);
    try {
      if (query && query.trim()) {
        localStorage.setItem(LAST_QUERY_STORAGE_KEY, query.trim());
      } else {
        localStorage.removeItem(LAST_QUERY_STORAGE_KEY);
      }
    } catch (err) {
      console.warn('Failed to save last query to localStorage:', err);
    }
  }, []);

  // Startup health check & genre loading on mount
  useEffect(() => {
    let isMounted = true;

    const initialize = async () => {
      // 1. Check TMDb connectivity / configuration
      try {
        const health = await checkConfiguration();
        if (isMounted && !health.ok && health.error) {
          setHealthError(health.error);
        }
      } catch (err) {
        if (isMounted) {
          setHealthError(err.userMessage || "Can't reach TMDb. Check your connection or try another network.");
        }
      }

      // 2. Load genres
      setGenresLoading(true);
      try {
        const list = await getGenres();
        if (isMounted) {
          setGenres(list || []);
          setGenresError(null);
        }
      } catch (err) {
        if (isMounted) {
          setGenresError(err.userMessage || 'Failed to load genres.');
        }
      } finally {
        if (isMounted) {
          setGenresLoading(false);
        }
      }
    };

    initialize();

    return () => {
      isMounted = false;
    };
  }, []);

  // Map of genre id -> genre name for fast lookup
  const genreMap = useMemo(() => {
    const map = new Map();
    genres.forEach((g) => map.set(g.id, g.name));
    return map;
  }, [genres]);

  // Helper to map genre_ids to an array of up to `max` genre names
  const getGenreNames = useCallback(
    (genreIds, max = 2) => {
      if (!genreIds || !Array.isArray(genreIds)) return [];
      const names = [];
      for (const id of genreIds) {
        const name = genreMap.get(id);
        if (name) {
          names.push(name);
          if (names.length >= max) break;
        }
      }
      return names;
    },
    [genreMap]
  );

  // Toggle or select genres (multi-select, with "All" option resetting to empty array)
  const toggleGenre = useCallback((genreId) => {
    if (genreId === null || genreId === undefined || genreId === '') {
      // Selecting "All" clears specific genres
      setSelectedGenreIds([]);
      return;
    }
    const numId = Number(genreId);
    setSelectedGenreIds((prev) => {
      if (prev.includes(numId)) {
        return prev.filter((id) => id !== numId);
      }
      return [...prev, numId];
    });
  }, []);

  const clearGenres = useCallback(() => {
    setSelectedGenreIds([]);
  }, []);

  // Check if movie is saved in favorites
  const isFavorite = useCallback(
    (id) => {
      if (!id) return false;
      return favorites.some((item) => Number(item.id) === Number(id));
    },
    [favorites]
  );

  // Add movie to favorites
  const addFavorite = useCallback((movie) => {
    if (!movie || !movie.id) return;
    setFavorites((prev) => {
      if (prev.some((item) => Number(item.id) === Number(movie.id))) {
        return prev;
      }
      const minimalMovie = {
        id: movie.id,
        title: movie.title || movie.name || 'Untitled',
        poster_path: movie.poster_path || null,
        release_date: movie.release_date || movie.first_air_date || '',
        vote_average: movie.vote_average || 0,
        genre_ids: movie.genre_ids || (movie.genres ? movie.genres.map((g) => g.id) : []),
        overview: movie.overview || '',
      };
      return [minimalMovie, ...prev];
    });
  }, []);

  // Remove movie from favorites
  const removeFavorite = useCallback((id) => {
    if (!id) return;
    setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  }, []);

  // Toggle favorite status
  const toggleFavorite = useCallback(
    (movie) => {
      if (!movie || !movie.id) return;
      if (isFavorite(movie.id)) {
        removeFavorite(movie.id);
      } else {
        addFavorite(movie);
      }
    },
    [isFavorite, addFavorite, removeFavorite]
  );

  const value = {
    favorites,
    isFavorite,
    addFavorite,
    removeFavorite,
    toggleFavorite,
    lastQuery,
    setLastQuery,
    genres,
    genresLoading,
    genresError,
    genreMap,
    getGenreNames,
    selectedGenreIds,
    toggleGenre,
    clearGenres,
    healthError,
    isApiKeyMissing,
  };

  return <MovieContext.Provider value={value}>{children}</MovieContext.Provider>;
};

export const useMovie = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovie must be used within a MovieProvider');
  }
  return context;
};

export default MovieContext;
