import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import { useMovie } from '../context/MovieContext';

/**
 * GenreFilter:
 * - Horizontally scrollable row of selectable pills (multi-select with "All" option)
 * - Year selector with active badge and clear action
 * - Minimum rating slider
 */
const GenreFilter = ({
  filters,
  onFilterChange,
  selectedGenreIds = [],
  onToggleGenre,
  onReset,
}) => {
  const { genres } = useMovie();

  const maxYear = Math.max(new Date().getFullYear() + 1, 2026);
  const yearOptions = Array.from({ length: 35 }, (_, i) => maxYear - i);

  const isAllSelected = !selectedGenreIds || selectedGenreIds.length === 0;

  const handleYearChange = (e) => {
    onFilterChange({ ...filters, year: e.target.value });
  };

  const handleClearYear = () => {
    onFilterChange({ ...filters, year: '' });
  };

  const handleRatingChange = (e, val) => {
    onFilterChange({ ...filters, minRating: val });
  };

  const hasAnyFilterActive =
    !isAllSelected || Boolean(filters.year) || Boolean(filters.minRating && filters.minRating > 0);

  return (
    <Box sx={{ width: '100%', mb: 3 }}>
      {/* Horizontally Scrollable Genre Pills */}
      <Box
        sx={{
          display: 'flex',
          gap: 1,
          overflowX: 'auto',
          py: 1,
          px: 0.5,
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' },
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* "All" Pill */}
        <Chip
          label="All"
          clickable
          onClick={() => onToggleGenre('')}
          variant={isAllSelected ? 'filled' : 'outlined'}
          color={isAllSelected ? 'primary' : 'default'}
          size="small"
          sx={{
            fontWeight: 600,
            borderRadius: 16,
            px: 0.75,
            borderWidth: 1,
            backgroundColor: isAllSelected ? 'primary.main' : 'transparent',
            color: isAllSelected ? 'primary.contrastText' : 'text.primary',
            '&:hover': {
              backgroundColor: isAllSelected ? 'primary.main' : 'action.hover',
            },
          }}
        />

        {/* Dynamic Genre Pills */}
        {genres.map((genre) => {
          const isSelected = selectedGenreIds.includes(genre.id);
          return (
            <Chip
              key={genre.id}
              label={genre.name}
              clickable
              onClick={() => onToggleGenre(genre.id)}
              variant={isSelected ? 'filled' : 'outlined'}
              color={isSelected ? 'primary' : 'default'}
              size="small"
              sx={{
                fontWeight: isSelected ? 600 : 400,
                borderRadius: 16,
                px: 0.75,
                borderWidth: 1,
                backgroundColor: isSelected ? 'primary.main' : 'transparent',
                color: isSelected ? 'primary.contrastText' : 'text.primary',
                '&:hover': {
                  backgroundColor: isSelected ? 'primary.main' : 'action.hover',
                },
              }}
            />
          );
        })}
      </Box>

      {/* Secondary Controls: Year & Min Rating */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          gap: 3,
          mt: 1.5,
          pt: 1.5,
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        {/* Year Dropdown with active badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            Year:
          </Typography>
          <FormControl size="small" variant="standard" sx={{ minWidth: 95 }}>
            <Select
              value={filters.year || ''}
              onChange={handleYearChange}
              displayEmpty
              disableUnderline
              sx={{
                fontSize: '0.85rem',
                fontWeight: filters.year ? 700 : 500,
                color: filters.year ? 'primary.main' : 'text.primary',
                borderBottom: 1,
                borderColor: filters.year ? 'primary.main' : 'divider',
                pb: 0.2,
              }}
            >
              <MenuItem value="">
                <em>All Years</em>
              </MenuItem>
              {yearOptions.map((yr) => (
                <MenuItem key={yr} value={yr}>
                  {yr}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Active Year Filter Pill */}
          {filters.year && (
            <Chip
              label={`${filters.year}`}
              size="small"
              onDelete={handleClearYear}
              color="primary"
              variant="outlined"
              sx={{
                height: 22,
                fontSize: '0.75rem',
                fontWeight: 600,
                borderColor: 'primary.main',
              }}
            />
          )}
        </Box>

        {/* Rating Slider */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, minWidth: 200, maxWidth: 280, flexGrow: 1 }}>
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600, whiteSpace: 'nowrap' }}>
            Rating {filters.minRating > 0 ? `≥ ${filters.minRating.toFixed(1)}` : 'Any'}:
          </Typography>
          <Slider
            size="small"
            value={filters.minRating || 0}
            min={0}
            max={9}
            step={0.5}
            onChange={handleRatingChange}
            aria-label="Minimum rating"
            sx={{
              color: 'primary.main',
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
              },
            }}
          />
        </Box>

        {/* Reset Action */}
        {hasAnyFilterActive && (
          <Button
            size="small"
            onClick={onReset}
            sx={{
              color: 'text.secondary',
              fontSize: '0.75rem',
              p: 0,
              minWidth: 'auto',
              textDecoration: 'underline',
              '&:hover': {
                color: 'text.primary',
                background: 'transparent',
              },
            }}
          >
            Reset Filters
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default GenreFilter;
