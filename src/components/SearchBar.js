import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { useDebounce } from '../hooks/useDebounce';

/**
 * Editorial SearchBar component:
 * Clean, minimal input with 500ms debouncing and clear action.
 */
const SearchBar = ({
  initialQuery = '',
  onSearchChange,
  placeholder = 'Search by title (e.g. Inception, Dune)...',
}) => {
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    setSearchTerm(initialQuery);
  }, [initialQuery]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (onSearchChange) {
      onSearchChange(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm, onSearchChange]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 640,
        mx: 'auto',
        my: 2.5,
        display: 'flex',
        alignItems: 'center',
        border: 1,
        borderColor: 'divider',
        borderRadius: '4px',
        backgroundColor: 'background.paper',
        px: 1.5,
        py: 0.5,
        transition: 'border-color 0.2s ease',
        '&:focus-within': {
          borderColor: 'primary.main',
        },
      }}
    >
      <SearchIcon sx={{ color: 'text.secondary', fontSize: 20, mr: 1 }} />
      <InputBase
        fullWidth
        value={searchTerm}
        onChange={handleChange}
        placeholder={placeholder}
        inputProps={{
          'aria-label': 'Search movies by title',
        }}
        sx={{
          fontSize: '0.9rem',
          color: 'text.primary',
        }}
      />
      {searchTerm && (
        <IconButton
          size="small"
          onClick={handleClear}
          aria-label="Clear search input"
          sx={{ p: 0.5, color: 'text.secondary' }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default SearchBar;
