import React, { useMemo } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

/**
 * TrailerEmbed:
 * - Finds YouTube video of type "Trailer" in results
 * - 16:9 responsive aspect ratio
 * - Privacy-respecting youtube-nocookie.com iframe
 * - Understated fallback when none available
 */
const TrailerEmbed = ({ videos = [], movieTitle = 'Movie' }) => {
  const trailerVideo = useMemo(() => {
    if (!videos || !Array.isArray(videos)) return null;

    // Prefer official trailer
    const official = videos.find(
      (v) =>
        v.site === 'YouTube' &&
        v.type === 'Trailer' &&
        v.official === true &&
        Boolean(v.key)
    );
    if (official) return official;

    // Any trailer
    const anyTrailer = videos.find(
      (v) => v.site === 'YouTube' && v.type === 'Trailer' && Boolean(v.key)
    );
    if (anyTrailer) return anyTrailer;

    // Teaser fallback
    return videos.find(
      (v) =>
        v.site === 'YouTube' &&
        (v.type === 'Teaser' || v.type === 'Clip') &&
        Boolean(v.key)
    );
  }, [videos]);

  if (!trailerVideo) {
    return (
      <Box
        sx={{
          p: 3,
          border: 1,
          borderColor: 'divider',
          borderRadius: '4px',
          textAlign: 'center',
          backgroundColor: 'background.paper',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          No trailer available for this title.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        paddingTop: '56.25%', // 16:9
        borderRadius: '4px',
        overflow: 'hidden',
        backgroundColor: '#000000',
      }}
    >
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${trailerVideo.key}?rel=0`}
        title={`Official trailer for ${movieTitle}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          border: 'none',
        }}
      />
    </Box>
  );
};

export default TrailerEmbed;
