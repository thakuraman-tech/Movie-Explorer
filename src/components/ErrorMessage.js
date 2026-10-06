import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

/**
 * Editorial ErrorMessage banner with clear reason and Retry button.
 */
const ErrorMessage = ({ message, onRetry, title }) => {
  if (!message) return null;

  return (
    <Box
      sx={{
        width: '100%',
        my: 3,
        p: 2,
        borderRadius: '4px',
        border: 1,
        borderColor: 'error.main',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(211, 47, 47, 0.1)'
            : 'rgba(211, 47, 47, 0.05)',
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'flex-start', sm: 'center' },
        justifyContent: 'space-between',
        gap: 2,
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5 }}>
        <ErrorOutlineIcon color="error" sx={{ mt: 0.25, fontSize: 20 }} />
        <Box>
          {title && (
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'text.primary', mb: 0.25 }}>
              {title}
            </Typography>
          )}
          <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.85rem' }}>
            {message}
          </Typography>
        </Box>
      </Box>

      {onRetry && (
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          onClick={onRetry}
          startIcon={<RefreshIcon fontSize="small" />}
          sx={{
            flexShrink: 0,
            fontSize: '0.75rem',
            py: 0.5,
            px: 1.5,
            borderRadius: '4px',
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': {
              borderColor: 'text.primary',
            },
          }}
        >
          Retry
        </Button>
      )}
    </Box>
  );
};

export default ErrorMessage;
