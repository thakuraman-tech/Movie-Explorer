import axios from 'axios';
import { MOCK_GENRES, MOCK_MOVIES } from './mockData';

/**
 * Base URLs for TMDb API v3 and image assets
 */
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
export const BACKDROP_BASE_URL = 'https://image.tmdb.org/t/p/original';

/**
 * Check if the TMDb API key is set in environment variables
 */
const rawApiKey = process.env.REACT_APP_TMDB_API_KEY;
export const isApiKeyMissing =
  !rawApiKey || typeof rawApiKey !== 'string' || rawApiKey.trim() === '';

if (isApiKeyMissing) {
  console.info(
    '[TMDb Mode]: No REACT_APP_TMDB_API_KEY detected. ' +
      'Movie Explorer is running in curated Offline Demo Mode with local movie catalog.'
  );
}

/**
 * Fallback placeholder images styled to match warm neutral dark theme
 */
export const POSTER_FALLBACK =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22500%22%20height%3D%22750%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2317171A%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23636166%22%20font-family%3D%22sans-serif%22%20font-size%3D%2220%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Poster%3C%2Ftext%3E%3C%2Fsvg%3E';

export const CAST_FALLBACK =
  'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%2317171A%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20fill%3D%22%23636166%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Photo%3C%2Ftext%3E%3C%2Fsvg%3E';

/**
 * TMDb Axios instance configured with 10s timeout
 */
export const tmdbClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000,
});

tmdbClient.interceptors.request.use(
  (config) => {
    const apiKey = process.env.REACT_APP_TMDB_API_KEY;
    if (apiKey && apiKey.trim()) {
      config.params = {
        ...config.params,
        api_key: apiKey.trim(),
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

tmdbClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    const config = error.config;
    const isNetworkOrTimeout =
      !error.response || error.code === 'ECONNABORTED' || error.message.includes('Network Error');

    if (config && isNetworkOrTimeout && (!config.__retryCount || config.__retryCount < 1)) {
      config.__retryCount = (config.__retryCount || 0) + 1;
      try {
        return await tmdbClient(config);
      } catch (retryError) {
        return Promise.reject(formatAxiosError(retryError));
      }
    }

    return Promise.reject(formatAxiosError(error));
  }
);

function formatAxiosError(error) {
  let userFriendlyMessage = 'An unexpected error occurred. Please try again.';

  if (!error.response) {
    if (typeof window !== 'undefined' && !window.navigator.onLine) {
      userFriendlyMessage = 'You appear to be offline. Check your internet connection.';
    } else if (error.code === 'ECONNABORTED') {
      userFriendlyMessage = 'Request timed out. Check your connection or try another network.';
    } else {
      userFriendlyMessage = "Can't reach TMDb. Check your connection or try another network.";
    }
  } else {
    const { status } = error.response;
    switch (status) {
      case 401:
        userFriendlyMessage = 'Invalid TMDb API key. Verify REACT_APP_TMDB_API_KEY in .env and restart the server.';
        break;
      case 404:
        userFriendlyMessage = 'The requested title or resource was not found.';
        break;
      case 429:
        userFriendlyMessage = 'TMDb rate limit exceeded. Please wait a few seconds.';
        break;
      case 500:
      case 502:
      case 503:
      case 504:
        userFriendlyMessage = 'TMDb server error. Please try again later.';
        break;
      default:
        userFriendlyMessage = error.response.data?.status_message || `Request failed with status code ${status}.`;
        break;
    }
  }

  error.userMessage = userFriendlyMessage;
  return error;
}

/**
 * Startup health check: calls /configuration once to verify connectivity and API key validity.
 */
export const checkConfiguration = async (signal) => {
  if (isApiKeyMissing) {
    return { ok: true, isDemoMode: true };
  }

  try {
    const response = await tmdbClient.get('/configuration', { signal });
    return { ok: true, data: response.data };
  } catch (error) {
    if (axios.isCancel(error)) {
      return { ok: false, canceled: true };
    }
    return {
      ok: false,
      error: error.userMessage || "Can't reach TMDb. Check your connection or try another network.",
    };
  }
};

/**
 * Fetch weekly trending movies (falls back to mock catalog when no key provided)
 */
export const getTrending = async (page = 1, signal) => {
  if (isApiKeyMissing) {
    return {
      page: 1,
      results: MOCK_MOVIES,
      total_pages: 1,
      total_results: MOCK_MOVIES.length,
      isDemo: true,
    };
  }

  try {
    const response = await tmdbClient.get('/trending/movie/week', {
      params: { page },
      signal,
    });
    return response.data;
  } catch (err) {
    // If live call fails, fallback to mock data
    console.warn('Falling back to local demo catalog due to network error:', err);
    return {
      page: 1,
      results: MOCK_MOVIES,
      total_pages: 1,
      total_results: MOCK_MOVIES.length,
      isDemo: true,
    };
  }
};

/**
 * Search movies by text query
 */
export const searchMovies = async (query, page = 1, signal) => {
  if (!query || !query.trim()) {
    return { results: [], page: 1, total_pages: 0, total_results: 0 };
  }

  if (isApiKeyMissing) {
    const q = query.trim().toLowerCase();
    const filtered = MOCK_MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.overview && m.overview.toLowerCase().includes(q)) ||
        (m.credits?.cast || []).some((c) => c.name.toLowerCase().includes(q))
    );
    return {
      results: filtered,
      page: 1,
      total_pages: 1,
      total_results: filtered.length,
      isDemo: true,
    };
  }

  try {
    const response = await tmdbClient.get('/search/movie', {
      params: {
        query: query.trim(),
        page,
        include_adult: false,
      },
      signal,
    });
    return response.data;
  } catch (err) {
    const q = query.trim().toLowerCase();
    const filtered = MOCK_MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(q) ||
        (m.overview && m.overview.toLowerCase().includes(q)) ||
        (m.credits?.cast || []).some((c) => c.name.toLowerCase().includes(q))
    );
    return {
      results: filtered,
      page: 1,
      total_pages: 1,
      total_results: filtered.length,
      isDemo: true,
    };
  }
};

/**
 * Fetch complete movie details with credits and videos
 */
export const getMovieDetails = async (id, signal) => {
  if (isApiKeyMissing) {
    const found = MOCK_MOVIES.find((m) => Number(m.id) === Number(id));
    return found || MOCK_MOVIES[0];
  }

  try {
    const response = await tmdbClient.get(`/movie/${id}`, {
      params: {
        append_to_response: 'credits,videos',
      },
      signal,
    });
    return response.data;
  } catch (err) {
    const found = MOCK_MOVIES.find((m) => Number(m.id) === Number(id));
    if (found) return found;
    throw err;
  }
};

/**
 * Fetch official list of movie genres
 */
export const getGenres = async (signal) => {
  if (isApiKeyMissing) {
    return MOCK_GENRES;
  }

  try {
    const response = await tmdbClient.get('/genre/movie/list', {
      params: { language: 'en-US' },
      signal,
    });
    return response.data?.genres || MOCK_GENRES;
  } catch (err) {
    return MOCK_GENRES;
  }
};

/**
 * Discover movies based on selected genre IDs (pipe OR), year, and rating
 */
export const discoverMovies = async (filters = {}, page = 1, signal) => {
  if (isApiKeyMissing) {
    let results = [...MOCK_MOVIES];

    if (filters.genreIds && filters.genreIds.length > 0) {
      results = results.filter((m) => {
        const mGenres = m.genre_ids || [];
        return filters.genreIds.some((id) => mGenres.includes(Number(id)));
      });
    }

    if (filters.year) {
      results = results.filter(
        (m) => (m.release_date || '').slice(0, 4) === String(filters.year)
      );
    }

    if (filters.minRating && filters.minRating > 0) {
      results = results.filter((m) => (m.vote_average || 0) >= filters.minRating);
    }

    return {
      results,
      page: 1,
      total_pages: 1,
      total_results: results.length,
      isDemo: true,
    };
  }

  const params = {
    page,
    sort_by: 'popularity.desc',
    include_adult: false,
  };

  if (filters.genreIds && filters.genreIds.length > 0) {
    params.with_genres = filters.genreIds.join('|');
  } else if (filters.genreId) {
    params.with_genres = filters.genreId;
  }

  if (filters.year) {
    params.primary_release_year = filters.year;
  }

  if (filters.minRating && filters.minRating > 0) {
    params['vote_average.gte'] = filters.minRating;
    params['vote_count.gte'] = 50;
  }

  try {
    const response = await tmdbClient.get('/discover/movie', {
      params,
      signal,
    });
    return response.data;
  } catch (err) {
    // Fallback to local filtering
    let results = [...MOCK_MOVIES];
    if (filters.genreIds && filters.genreIds.length > 0) {
      results = results.filter((m) => {
        const mGenres = m.genre_ids || [];
        return filters.genreIds.some((id) => mGenres.includes(Number(id)));
      });
    }
    if (filters.year) {
      results = results.filter(
        (m) => (m.release_date || '').slice(0, 4) === String(filters.year)
      );
    }
    if (filters.minRating && filters.minRating > 0) {
      results = results.filter((m) => (m.vote_average || 0) >= filters.minRating);
    }
    return {
      results,
      page: 1,
      total_pages: 1,
      total_results: results.length,
      isDemo: true,
    };
  }
};

/**
 * Helpers to construct image URLs with fallback
 */
export const getPosterUrl = (path) => {
  if (!path) return POSTER_FALLBACK;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return `${IMAGE_BASE_URL}${path}`;
};

export const getBackdropUrl = (path) => {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return `${BACKDROP_BASE_URL}${path}`;
};

export const getCastPhotoUrl = (path) => {
  if (!path) return CAST_FALLBACK;
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  return `${IMAGE_BASE_URL}${path}`;
};
