import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import CircularProgress from '@mui/material/CircularProgress';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import MovieGrid from '../components/MovieGrid';
import GenreFilter from '../components/GenreFilter';
import ErrorMessage from '../components/ErrorMessage';
import Loader from '../components/Loader';
import { useMovie } from '../context/MovieContext';
import { useInfiniteScroll } from '../hooks/useInfiniteScroll';
import {
  getTrending,
  searchMovies,
  discoverMovies,
  getBackdropUrl,
} from '../api/tmdb';

/**
 * Editorial Home Page:
 * - Scrim Hero showcasing #1 trending title
 * - "Trending this week" horizontal scroll-snap row
 * - Multi-select genre pills & year filter
 * - Always-visible responsive catalogue grid that updates on year/genre change
 * - Infinite scroll / Load more toggle
 */
const Home = () => {
  const navigate = useNavigate();
  const {
    lastQuery,
    setLastQuery,
    selectedGenreIds,
    toggleGenre,
    clearGenres,
    healthError,
    isApiKeyMissing,
    isFavorite,
    toggleFavorite,
  } = useMovie();

  // Search query & secondary filters
  const [searchQuery, setSearchQuery] = useState(lastQuery || '');
  const [filters, setFilters] = useState({
    year: '',
    minRating: 0,
  });

  // Toggle pagination mode (default: infinite scroll)
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(true);

  // Trending state
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingLoading, setTrendingLoading] = useState(false);
  const [trendingError, setTrendingError] = useState(null);

  // Discovered / Search results state
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const hasSearch = Boolean(searchQuery && searchQuery.trim().length > 0);
  const hasGenreFilter = Boolean(selectedGenreIds && selectedGenreIds.length > 0);
  const hasOtherFilters = Boolean(
    filters.year || (filters.minRating && filters.minRating > 0)
  );

  /**
   * Fetch weekly trending movies on startup
   */
  const fetchTrending = useCallback(async () => {
    setTrendingLoading(true);
    setTrendingError(null);
    try {
      const data = await getTrending(1);
      setTrendingMovies(data.results || []);
    } catch (err) {
      if (err.name !== 'CanceledError' && err.message !== 'canceled') {
        setTrendingError(
          err.userMessage || 'Unable to load trending movies. Check connection.'
        );
      }
    } finally {
      setTrendingLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrending();
  }, [fetchTrending]);

  /**
   * Client-side filter helper for combining search with filters
   */
  const applyClientFilters = useCallback(
    (movieList) => {
      return movieList.filter((movie) => {
        // Multi-genre OR match
        if (hasGenreFilter) {
          const movieGenres = movie.genre_ids || [];
          const matchesAny = selectedGenreIds.some((id) => movieGenres.includes(id));
          if (!matchesAny) return false;
        }
        // Year match
        if (filters.year) {
          const releaseYear = (movie.release_date || movie.first_air_date || '').slice(0, 4);
          if (releaseYear !== String(filters.year)) return false;
        }
        // Rating match
        if (filters.minRating && filters.minRating > 0) {
          if ((movie.vote_average || 0) < filters.minRating) return false;
        }
        return true;
      });
    },
    [hasGenreFilter, selectedGenreIds, filters]
  );

  /**
   * Main fetch for Search or Discover
   */
  const fetchMoviesData = useCallback(
    async (targetPage, isLoadMore = false) => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();
      const { signal } = abortControllerRef.current;

      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
        setError(null);
      }

      try {
        let data;

        if (hasSearch) {
          data = await searchMovies(searchQuery, targetPage, signal);
        } else {
          // Discover by selected genres, year, and rating (or default catalogue)
          data = await discoverMovies(
            {
              genreIds: selectedGenreIds,
              year: filters.year,
              minRating: filters.minRating,
            },
            targetPage,
            signal
          );
        }

        let fetchedResults = data.results || [];

        // Apply client-side filters if combining search with filters
        if (hasSearch && (hasGenreFilter || hasOtherFilters)) {
          fetchedResults = applyClientFilters(fetchedResults);
        }

        if (isLoadMore) {
          setMovies((prev) => {
            const existingIds = new Set(prev.map((m) => m.id));
            const newUnique = fetchedResults.filter((m) => !existingIds.has(m.id));
            return [...prev, ...newUnique];
          });
        } else {
          setMovies(fetchedResults);
        }

        setPage(targetPage);
        setTotalPages(data.total_pages || 1);
      } catch (err) {
        if (err.name === 'CanceledError' || err.message === 'canceled') {
          return;
        }
        setError(err.userMessage || 'Failed to fetch movies. Please retry.');
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [
      hasSearch,
      hasGenreFilter,
      hasOtherFilters,
      searchQuery,
      selectedGenreIds,
      filters,
      applyClientFilters,
    ]
  );

  // Automatically fetch movies whenever search query, selected genres, or filters change
  useEffect(() => {
    fetchMoviesData(1, false);

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchQuery, selectedGenreIds, filters, fetchMoviesData]);

  const handleSearchChange = useCallback(
    (newQuery) => {
      setSearchQuery(newQuery);
      setLastQuery(newQuery);
    },
    [setLastQuery]
  );

  const handleResetAll = useCallback(() => {
    setSearchQuery('');
    setLastQuery('');
    clearGenres();
    setFilters({ year: '', minRating: 0 });
  }, [setLastQuery, clearGenres]);

  const hasMore = page < totalPages;

  const handleLoadMore = useCallback(() => {
    if (!isLoading && !isLoadingMore && hasMore) {
      fetchMoviesData(page + 1, true);
    }
  }, [isLoading, isLoadingMore, hasMore, page, fetchMoviesData]);

  const sentinelRef = useInfiniteScroll({
    isLoading: isLoading || isLoadingMore,
    hasMore,
    onLoadMore: handleLoadMore,
    enabled: isInfiniteScroll,
  });

  // #1 Trending movie for the Hero header
  const heroMovie = trendingMovies.length > 0 ? trendingMovies[0] : null;
  const heroBackdrop = heroMovie ? getBackdropUrl(heroMovie.backdrop_path) : null;
  const isHeroFavorite = heroMovie ? isFavorite(heroMovie.id) : false;

  // Grid title based on active filters
  const getGridTitle = () => {
    if (hasSearch) return `Results for "${searchQuery}"`;
    if (filters.year && hasGenreFilter) return `Films from ${filters.year} in Selected Genres`;
    if (filters.year) return `Films released in ${filters.year}`;
    if (hasGenreFilter) return 'Discovered Films by Genre';
    if (filters.minRating > 0) return `Films rated ${filters.minRating.toFixed(1)}+`;
    return 'Cinema Catalogue';
  };

  return (
    <Box sx={{ width: '100%', pb: 8 }}>
      {/* System Banners */}
      <Container maxWidth="xl" sx={{ pt: 2 }}>
        {isApiKeyMissing && (
          <Box
            sx={{
              p: 1.5,
              mb: 2,
              borderRadius: '4px',
              border: 1,
              borderColor: 'primary.main',
              backgroundColor: 'rgba(224, 165, 38, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '0.8125rem', color: 'text.primary' }}>
              <strong>Demo Mode:</strong> Displaying curated offline catalogue. Add your key to .env whenever you wish to connect live TMDb data.
            </Typography>
          </Box>
        )}

        {healthError && !isApiKeyMissing && (
          <ErrorMessage
            title="Connection Issue"
            message={healthError}
            onRetry={fetchTrending}
          />
        )}
      </Container>

      {/* Hero: Full-bleed backdrop scrim of the #1 trending movie (hidden only when text searching) */}
      {!hasSearch && heroMovie && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            minHeight: { xs: 340, sm: 460, md: 540 },
            backgroundImage: heroBackdrop ? `url(${heroBackdrop})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            mb: 4,
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to top, rgba(14, 14, 15, 0.98) 0%, rgba(14, 14, 15, 0.6) 60%, rgba(14, 14, 15, 0.25) 100%)',
            },
          }}
        >
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, pb: { xs: 4, sm: 6 } }}>
            <Box sx={{ maxWidth: 720, color: '#F2F1ED' }}>
              <Typography
                variant="overline"
                sx={{
                  color: 'primary.main',
                  letterSpacing: '0.1em',
                  fontWeight: 700,
                  display: 'block',
                  mb: 0.5,
                }}
              >
                Featured This Week
              </Typography>

              <Typography
                variant="h1"
                sx={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontSize: { xs: '2.5rem', sm: '3.8rem', md: '4.8rem' },
                  lineHeight: 1.05,
                  mb: 1.5,
                }}
              >
                {heroMovie.title || heroMovie.name}
              </Typography>

              {/* Year & Rating */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  fontSize: '0.85rem',
                  color: 'rgba(242, 241, 237, 0.75)',
                  mb: 2,
                }}
              >
                <span>{(heroMovie.release_date || '').slice(0, 4) || '—'}</span>
                {heroMovie.vote_average ? (
                  <>
                    <span>·</span>
                    <span style={{ color: '#E0A526', fontWeight: 600 }}>
                      ★ {heroMovie.vote_average.toFixed(1)}
                    </span>
                  </>
                ) : null}
              </Box>

              {/* Truncated overview */}
              {heroMovie.overview && (
                <Typography
                  variant="body2"
                  sx={{
                    color: 'rgba(242, 241, 237, 0.85)',
                    lineHeight: 1.6,
                    fontSize: '0.9rem',
                    mb: 3,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    maxWidth: 580,
                  }}
                >
                  {heroMovie.overview}
                </Typography>
              )}

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/movie/${heroMovie.id}`)}
                  sx={{
                    px: 3,
                    py: 1,
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                >
                  View details
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => toggleFavorite(heroMovie)}
                  startIcon={
                    isHeroFavorite ? (
                      <FavoriteIcon sx={{ color: 'primary.main', fontSize: 18 }} />
                    ) : (
                      <FavoriteBorderIcon sx={{ fontSize: 18 }} />
                    )
                  }
                  sx={{
                    px: 2.5,
                    py: 1,
                    fontSize: '0.85rem',
                    borderColor: 'rgba(242, 241, 237, 0.3)',
                    color: '#F2F1ED',
                    '&:hover': {
                      borderColor: '#F2F1ED',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    },
                  }}
                >
                  {isHeroFavorite ? 'Saved' : 'Save'}
                </Button>
              </Box>
            </Box>
          </Container>
        </Box>
      )}

      <Container maxWidth="xl">
        {/* Search Input with 500ms debounce */}
        <SearchBar
          initialQuery={searchQuery}
          onSearchChange={handleSearchChange}
          placeholder="Search titles (e.g. Inception, Dune)..."
        />

        {/* "Trending this week" Horizontal Scroll-Snap Row (hidden when searching text) */}
        {!hasSearch && (
          <Box sx={{ mb: 5 }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 2 }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: '"Instrument Serif", Georgia, serif',
                  fontSize: { xs: '1.6rem', sm: '2rem' },
                }}
              >
                Trending this week
              </Typography>
            </Box>

            {trendingError && (
              <ErrorMessage
                message={trendingError}
                onRetry={fetchTrending}
              />
            )}

            {trendingLoading ? (
              <Loader count={6} />
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  overflowX: 'auto',
                  pb: 1.5,
                  scrollSnapType: 'x mandatory',
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {trendingMovies.map((movie) => (
                  <Box
                    key={movie.id}
                    sx={{
                      width: { xs: 140, sm: 170, md: 190 },
                      flexShrink: 0,
                      scrollSnapAlign: 'start',
                    }}
                  >
                    <MovieCard movie={movie} />
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* Genre Pills & Secondary Filter Controls */}
        <Box sx={{ mt: 2, mb: 3 }}>
          <Typography
            variant="overline"
            sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}
          >
            Filter by Genre & Year
          </Typography>
          <GenreFilter
            filters={filters}
            onFilterChange={setFilters}
            selectedGenreIds={selectedGenreIds}
            onToggleGenre={toggleGenre}
            onReset={handleResetAll}
          />
        </Box>

        {/* Results Grid View: Always renders and reacts in real-time to filters */}
        <Box sx={{ mt: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 2.5,
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Instrument Serif", Georgia, serif',
                fontSize: { xs: '1.6rem', sm: '2rem' },
              }}
            >
              {getGridTitle()}
            </Typography>

            {/* Infinite Scroll vs Load More Toggle */}
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={isInfiniteScroll}
                  onChange={(e) => setIsInfiniteScroll(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                  {isInfiniteScroll ? 'Infinite scroll' : 'Manual load more'}
                </Typography>
              }
            />
          </Box>

          {/* Error message with retry */}
          {error && (
            <ErrorMessage
              message={error}
              onRetry={() => fetchMoviesData(page > 1 ? page : 1, page > 1)}
            />
          )}

          {/* Loading Skeletons */}
          {isLoading ? (
            <Loader count={10} />
          ) : (
            <>
              <MovieGrid
                movies={movies}
                emptyMessage={
                  filters.year
                    ? `No films found released in ${filters.year}. Try another year or click Reset.`
                    : hasSearch
                    ? `No results found for "${searchQuery}".`
                    : 'No movies match the selected criteria.'
                }
              />

              {/* Skeletons while loading subsequent pages */}
              {isLoadingMore && <Loader count={5} />}

              {/* Manual Load More Button */}
              {!isInfiniteScroll && hasMore && !isLoading && (
                <Box sx={{ textAlign: 'center', mt: 5 }}>
                  <Button
                    variant="outlined"
                    size="medium"
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    sx={{
                      px: 4,
                      py: 1,
                      fontSize: '0.85rem',
                      borderColor: 'divider',
                    }}
                  >
                    {isLoadingMore ? 'Loading...' : 'Load more titles'}
                  </Button>
                </Box>
              )}

              {/* Infinite Scroll Sentinel element */}
              {isInfiniteScroll && hasMore && (
                <Box
                  ref={sentinelRef}
                  sx={{
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    my: 2,
                  }}
                >
                  {isLoadingMore && <CircularProgress size={24} color="primary" />}
                </Box>
              )}

              {/* Terminal message */}
              {!hasMore && movies.length > 0 && (
                <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                  <Typography variant="caption">End of catalogue</Typography>
                </Box>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
