import React from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MovieCard from './MovieCard';

/**
 * Editorial MovieGrid:
 * 2 columns on mobile, 3 on sm, 4 on md, 5 on lg+ with tight gaps.
 */
const MovieGrid = ({ movies = [], emptyMessage = 'No movies found.' }) => {
  if (!movies || movies.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="body2" color="text.secondary">
          {emptyMessage}
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
      {movies.map((movie) => (
        <Grid item key={movie.id} xs={6} sm={4} md={3} lg={2.4}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MovieGrid;
