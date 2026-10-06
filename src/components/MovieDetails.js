import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { getBackdropUrl, getPosterUrl, getCastPhotoUrl, POSTER_FALLBACK } from '../api/tmdb';
import { useMovie } from '../context/MovieContext';
import TrailerEmbed from './TrailerEmbed';

const formatRuntime = (minutes) => {
  if (!minutes || minutes <= 0) return null;
  const hours = Math.floor(minutes / 60);
  const remainingMins = minutes % 60;
  if (hours === 0) return `${remainingMins}m`;
  return `${hours}h ${remainingMins}m`;
};

/**
 * Editorial MovieDetails:
 * - Scrim backdrop hero with serif title
 * - Overlapping poster
 * - Metadata line (year · runtime · rating)
 * - Outlined genre chips
 * - Cast as a horizontal scroll of circular photos
 * - 16:9 TrailerEmbed
 */
const MovieDetails = ({ movie }) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useMovie();

  if (!movie) return null;

  const {
    id,
    title,
    tagline,
    overview,
    release_date,
    runtime,
    vote_average,
    vote_count,
    genres = [],
    backdrop_path,
    poster_path,
    credits = {},
    videos = {},
  } = movie;

  const backdropUrl = getBackdropUrl(backdrop_path);
  const posterUrl = getPosterUrl(poster_path);
  const favorite = isFavorite(id);
  const ratingFormatted =
    typeof vote_average === 'number' && vote_average > 0
      ? vote_average.toFixed(1)
      : null;
  const releaseYear = (release_date || '').slice(0, 4) || '—';
  const runtimeFormatted = formatRuntime(runtime);

  const topCast = (credits.cast || []).slice(0, 10);
  const videoResults = videos.results || [];

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <Box sx={{ width: '100%', pb: 8 }}>
      {/* Back button */}
      <Box sx={{ mb: 2 }}>
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={handleBack}
          size="small"
          sx={{
            color: 'text.secondary',
            p: 0,
            fontSize: '0.8rem',
            '&:hover': { color: 'text.primary', background: 'transparent' },
          }}
        >
          Back
        </Button>
      </Box>

      {/* Hero Backdrop with Scrim Gradient */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          minHeight: { xs: 260, sm: 380, md: 480 },
          borderRadius: '4px',
          overflow: 'hidden',
          backgroundColor: 'background.paper',
          backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          p: { xs: 2, sm: 4 },
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, rgba(14, 14, 15, 0.95) 0%, rgba(14, 14, 15, 0.6) 60%, rgba(14, 14, 15, 0.2) 100%)',
          },
        }}
      >
        {/* Content over scrim */}
        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 840, color: '#F2F1ED' }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: '"Instrument Serif", Georgia, serif',
              fontSize: { xs: '2.2rem', sm: '3.4rem', md: '4.2rem' },
              lineHeight: 1.05,
              mb: 1,
            }}
          >
            {title}
          </Typography>

          {tagline && (
            <Typography
              variant="subtitle1"
              sx={{
                fontStyle: 'italic',
                color: 'rgba(242, 241, 237, 0.75)',
                fontSize: { xs: '0.9rem', sm: '1.05rem' },
                mb: 1.5,
              }}
            >
              "{tagline}"
            </Typography>
          )}

          {/* Metadata line: year · runtime · rating */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 1.5,
              fontSize: '0.85rem',
              color: 'rgba(242, 241, 237, 0.8)',
              mb: 2.5,
            }}
          >
            <span>{releaseYear}</span>
            {runtimeFormatted && (
              <>
                <span>·</span>
                <span>{runtimeFormatted}</span>
              </>
            )}
            {ratingFormatted && (
              <>
                <span>·</span>
                <span style={{ color: '#E0A526', fontWeight: 600 }}>★ {ratingFormatted}</span>
                {vote_count ? (
                  <span style={{ opacity: 0.65 }}>({vote_count.toLocaleString()})</span>
                ) : null}
              </>
            )}
          </Box>

          {/* Action: Save/Favorite */}
          <Button
            variant="outlined"
            onClick={() => toggleFavorite(movie)}
            startIcon={
              favorite ? (
                <FavoriteIcon sx={{ color: 'primary.main', fontSize: 18 }} />
              ) : (
                <FavoriteBorderIcon sx={{ fontSize: 18 }} />
              )
            }
            sx={{
              borderColor: 'rgba(242, 241, 237, 0.3)',
              color: '#F2F1ED',
              fontSize: '0.8125rem',
              py: 0.6,
              px: 2,
              '&:hover': {
                borderColor: '#F2F1ED',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            {favorite ? 'Saved to collection' : 'Save to collection'}
          </Button>
        </Box>
      </Box>

      {/* Main Content: Poster, Overview, Outlined Genres, Trailer, Cast */}
      <Box sx={{ mt: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Left: Overlapping Poster & Outlined Genres */}
        <Box sx={{ width: { xs: '100%', sm: 220, md: 240 }, flexShrink: 0 }}>
          <Box
            component="img"
            src={posterUrl}
            alt={`Poster for ${title}`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = POSTER_FALLBACK;
            }}
            sx={{
              width: '100%',
              borderRadius: '4px',
              backgroundColor: 'background.paper',
              display: 'block',
              mb: 2,
            }}
          />

          {/* Outlined Genre Chips */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
            {genres.map((g) => (
              <Chip
                key={g.id}
                label={g.name}
                variant="outlined"
                size="small"
                sx={{
                  fontSize: '0.75rem',
                  borderColor: 'divider',
                  color: 'text.secondary',
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Right: Synopsis, Trailer, Cast */}
        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
          {/* Overview */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
              Synopsis
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.primary',
                lineHeight: 1.7,
                fontSize: '0.95rem',
                maxWidth: 720,
              }}
            >
              {overview || 'No overview available.'}
            </Typography>
          </Box>

          {/* Trailer */}
          <Box sx={{ mb: 5 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 1 }}>
              Trailer
            </Typography>
            <TrailerEmbed videos={videoResults} movieTitle={title} />
          </Box>

          {/* Cast: Horizontal Scroll of Circular Photos */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
              Cast
            </Typography>

            {topCast.length === 0 ? (
              <Typography variant="body2" color="text.secondary">
                Cast information unavailable.
              </Typography>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  gap: 2.5,
                  overflowX: 'auto',
                  pb: 1,
                  scrollbarWidth: 'none',
                  '&::-webkit-scrollbar': { display: 'none' },
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                {topCast.map((person) => (
                  <Box
                    key={person.id || person.credit_id}
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      width: 80,
                      flexShrink: 0,
                    }}
                  >
                    <Avatar
                      src={getCastPhotoUrl(person.profile_path)}
                      alt={person.name}
                      sx={{
                        width: 64,
                        height: 64,
                        mb: 1,
                        backgroundColor: 'background.paper',
                        border: 1,
                        borderColor: 'divider',
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.2,
                        color: 'text.primary',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                      title={person.name}
                    >
                      {person.name}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.7rem',
                        lineHeight: 1.1,
                        mt: 0.25,
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                      title={person.character}
                    >
                      {person.character}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MovieDetails;
