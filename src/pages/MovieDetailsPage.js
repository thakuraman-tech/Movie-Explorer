import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import MovieDetails from '../components/MovieDetails';
import ErrorMessage from '../components/ErrorMessage';
import { getMovieDetails } from '../api/tmdb';

/**
 * MovieDetailsPage route component
 */
const MovieDetailsPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const abortControllerRef = useRef(null);

  const fetchDetails = useCallback(async () => {
    if (!id) return;

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      const data = await getMovieDetails(id, abortControllerRef.current.signal);
      setMovie(data);
    } catch (err) {
      if (err.name === 'CanceledError' || err.message === 'canceled') {
        return;
      }
      setError(
        err.userMessage || 'Failed to load movie details. Check connection and retry.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
    window.scrollTo({ top: 0, behavior: 'smooth' });

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [fetchDetails]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Skeletons on loading */}
      {isLoading && (
        <Box sx={{ width: '100%', my: 2 }}>
          <Skeleton
            variant="rectangular"
            sx={{
              width: '100%',
              height: { xs: 260, md: 440 },
              borderRadius: '4px',
              backgroundColor: 'action.hover',
              mb: 4,
            }}
            animation="wave"
          />
          <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' } }}>
            <Skeleton
              variant="rectangular"
              sx={{
                width: { xs: '100%', sm: 220, md: 240 },
                height: 360,
                borderRadius: '4px',
                backgroundColor: 'action.hover',
                flexShrink: 0,
              }}
              animation="wave"
            />
            <Box sx={{ flexGrow: 1 }}>
              <Skeleton variant="text" width="40%" height={32} sx={{ mb: 1, backgroundColor: 'action.hover' }} />
              <Skeleton variant="text" width="90%" height={20} sx={{ backgroundColor: 'action.hover' }} />
              <Skeleton variant="text" width="85%" height={20} sx={{ backgroundColor: 'action.hover' }} />
              <Skeleton variant="text" width="70%" height={20} sx={{ mb: 4, backgroundColor: 'action.hover' }} />
              <Skeleton variant="rectangular" width="100%" height={280} sx={{ borderRadius: '4px', backgroundColor: 'action.hover' }} />
            </Box>
          </Box>
        </Box>
      )}

      {/* Error Banner with retry */}
      {error && !isLoading && <ErrorMessage message={error} onRetry={fetchDetails} />}

      {/* Full Movie Details */}
      {!isLoading && !error && movie && <MovieDetails movie={movie} />}
    </Container>
  );
};

export default MovieDetailsPage;
