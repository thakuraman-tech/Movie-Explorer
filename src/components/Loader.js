import React from 'react';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

/**
 * Editorial Skeleton Loader matching 2:3 movie card poster ratio.
 * Respects prefers-reduced-motion via Theme.
 */
const Loader = ({ count = 10 }) => {
  const skeletons = Array.from({ length: count }, (_, index) => index);

  return (
    <Box
      aria-busy="true"
      aria-live="polite"
      sx={{ width: '100%', my: 2 }}
    >
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 2.5 }}>
        {skeletons.map((idx) => (
          <Grid item key={idx} xs={6} sm={4} md={3} lg={2.4}>
            <Box sx={{ width: '100%' }}>
              {/* 2:3 Poster Skeleton */}
              <Box sx={{ position: 'relative', paddingTop: '150%', width: '100%', mb: 1 }}>
                <Skeleton
                  variant="rectangular"
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: '4px',
                    backgroundColor: 'action.hover',
                  }}
                  animation="wave"
                />
              </Box>

              {/* Text Skeletons */}
              <Skeleton
                variant="text"
                width="80%"
                height={18}
                sx={{ borderRadius: '2px', backgroundColor: 'action.hover' }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width="40%"
                height={14}
                sx={{ borderRadius: '2px', backgroundColor: 'action.hover' }}
                animation="wave"
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Loader;
