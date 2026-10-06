import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { getPosterUrl, POSTER_FALLBACK } from '../api/tmdb';
import { useMovie } from '../context/MovieContext';

/**
 * Editorial MovieCard:
 * - 2:3 aspect ratio poster with 4px border radius
 * - No drop shadows or card borders
 * - Rating corner pill badge
 * - Desktop hover: poster scale + favorite toggle; mobile: favorite always visible
 * - Genre names (max 2) mapped from genre_ids
 */
const MovieCard = memo(({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite, getGenreNames } = useMovie();

  if (!movie) return null;

  const {
    id,
    title,
    name,
    poster_path,
    release_date,
    first_air_date,
    vote_average,
    genre_ids,
  } = movie;

  const movieTitle = title || name || 'Untitled';
  const releaseYear = (release_date || first_air_date || '').slice(0, 4) || '—';
  const ratingFormatted =
    typeof vote_average === 'number' && vote_average > 0
      ? vote_average.toFixed(1)
      : 'NR';
  const favorite = isFavorite(id);
  const posterUrl = getPosterUrl(poster_path);
  const genreNames = getGenreNames ? getGenreNames(genre_ids, 2) : [];

  const handleClick = () => {
    navigate(`/movie/${id}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      aria-label={`View details for ${movieTitle}, released ${releaseYear}, rating ${ratingFormatted}`}
      sx={{
        width: '100%',
        backgroundColor: 'transparent',
        boxShadow: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        outline: 'none',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:focus-visible': {
          outline: '2px solid',
          outlineColor: 'primary.main',
          outlineOffset: '2px',
        },
        '&:hover .movie-poster': {
          transform: 'scale(1.03)',
        },
        '&:hover .favorite-button': {
          opacity: 1,
        },
      }}
    >
      {/* 2:3 Aspect Ratio Poster Container */}
      <Box
        sx={{
          position: 'relative',
          paddingTop: '150%', // 2:3 ratio
          width: '100%',
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'background.paper',
        }}
      >
        <CardMedia
          component="img"
          image={posterUrl}
          alt={`Poster for ${movieTitle}`}
          loading="lazy"
          className="movie-poster"
          onError={(e) => {
            e.currentTarget.src = POSTER_FALLBACK;
          }}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
          }}
        />

        {/* Rating Corner Pill Badge */}
        {ratingFormatted !== 'NR' && (
          <Box
            sx={{
              position: 'absolute',
              top: 6,
              left: 6,
              backgroundColor: 'rgba(14, 14, 15, 0.85)',
              color: '#F2F1ED',
              px: 0.75,
              py: 0.2,
              borderRadius: '2px',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.02em',
              lineHeight: 1.2,
            }}
          >
            ★ {ratingFormatted}
          </Box>
        )}

        {/* Favorite Heart Toggle: Visible on hover on desktop, always visible on mobile */}
        <Box
          className="favorite-button"
          sx={{
            position: 'absolute',
            top: 4,
            right: 4,
            opacity: { xs: 1, sm: favorite ? 1 : 0 },
            transition: 'opacity 0.2s ease',
            backgroundColor: 'rgba(14, 14, 15, 0.75)',
            borderRadius: '50%',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Tooltip title={favorite ? 'Remove from saved' : 'Save movie'}>
            <IconButton
              size="small"
              onClick={handleFavoriteClick}
              aria-label={
                favorite
                  ? `Remove ${movieTitle} from favorites`
                  : `Add ${movieTitle} to favorites`
              }
              sx={{
                p: 0.5,
                color: favorite ? 'primary.main' : '#FFFFFF',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
            >
              {favorite ? (
                <FavoriteIcon sx={{ fontSize: 18 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 18 }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Movie Metadata below poster */}
      <CardContent sx={{ p: 1, pb: '4px !important', px: 0.5 }}>
        <Typography
          variant="body2"
          component="h3"
          sx={{
            fontWeight: 600,
            fontSize: '0.875rem',
            lineHeight: 1.25,
            color: 'text.primary',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          title={movieTitle}
        >
          {movieTitle}
        </Typography>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.75,
            mt: 0.35,
            color: 'text.secondary',
            fontSize: '0.75rem',
          }}
        >
          <span>{releaseYear}</span>
          {genreNames.length > 0 && (
            <>
              <span>·</span>
              <span
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {genreNames.join(', ')}
              </span>
            </>
          )}
        </Box>
      </CardContent>
    </Card>
  );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
