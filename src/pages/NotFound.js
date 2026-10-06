import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

/**
 * Editorial 404 page
 */
const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ py: { xs: 10, sm: 16 }, textAlign: 'center' }}>
      <Typography
        variant="h1"
        sx={{
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontSize: { xs: '4rem', sm: '6rem' },
          lineHeight: 1,
          mb: 1,
          color: 'primary.main',
        }}
      >
        404
      </Typography>

      <Typography
        variant="h4"
        sx={{
          fontFamily: '"Instrument Serif", Georgia, serif',
          fontSize: '2rem',
          mb: 1.5,
        }}
      >
        Page not found
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 4, maxWidth: 360, mx: 'auto' }}>
        The page you requested could not be located or has been moved.
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
        Return to home
      </Button>
    </Container>
  );
};

export default NotFound;
