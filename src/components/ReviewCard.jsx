import React from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { tokens } from '../theme';
import { useTheme } from '@mui/material/styles';



const ReviewCard = ({ rating, date, comment, author }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: colors.primary[400],
        padding: '20px',
        margin: '0 20px',
        maxWidth: '100%',
      }}
    >
      <Box sx={{ display: 'flex', gap: '0.125rem', color: 'rgb(238, 203, 8)' }}>
       
        {[...Array(5 - rating)].map((_, index) => (
          <StarIcon key={index} sx={{ height: '1.25rem', width: '1.25rem', color: 'rgb(238, 203, 8)' }} />
        ))}
      </Box>

      <Box sx={{ marginTop: '1rem' }}>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(7, 63, 216, 1)',
            fontSize: '12px',
            fontWeight: '600',
          }}
        >
          {date}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            marginTop: '0.4rem',
            lineHeight: 1.625,
            color: 'rgba(107, 114, 128, 1)',
          }}
        >
          {comment}
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{
          marginTop: '1.3rem',
          fontSize: '0.875rem',
          lineHeight: '1.25rem',
          color: 'rgba(107, 114, 128, 1)',
        }}
      >
        — {author}
      </Typography>
    </Box>
  );
};

export default ReviewCard;
