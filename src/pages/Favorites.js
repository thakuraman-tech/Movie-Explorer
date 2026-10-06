import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import MovieGrid from '../components/MovieGrid';
import { useMovie } from '../context/MovieContext';

/**
 * Editorial Favorites view:
 * Clean title, movie count, responsive grid, understated empty state.
 */
const Favorites = () => {
  const { favorites } = useMovie();
  const hasFavorites = favorites && favorites.length > 0;

  return (
    <Container maxWidth="xl" sx={{ py: 4, pb: 8 }}>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'baseline', gap: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: '"Instrument Serif", Georgia, serif',
            fontSize: { xs: '2rem', sm: '2.8rem' },
          }}
        >
          Saved collection
        </Typography>
        {hasFavorites && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {favorites.length} {favorites.length === 1 ? 'title' : 'titles'}
          </Typography>
        )}
      </Box>

      {/* Grid or Empty State */}
      {hasFavorites ? (
        <MovieGrid
          movies={favorites}
          emptyMessage="No titles in your collection."
        />
      ) : (
        <Box
          sx={{
            py: 10,
            textAlign: 'center',
            maxWidth: 420,
            mx: 'auto',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: '1.8rem',
              mb: 1,
            }}
          >
            Your collection is empty
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
            Save films by clicking the heart on any poster to curate your watchlist.
          </Typography>
          <Button
            component={RouterLink}
            to="/"
            variant="outlined"
            size="small"
            sx={{
              px: 3,
              py: 0.8,
              fontSize: '0.8125rem',
              borderColor: 'divider',
            }}
          >
            Explore catalogue
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Favorites;
