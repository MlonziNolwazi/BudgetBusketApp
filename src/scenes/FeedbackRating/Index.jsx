import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material';
import { get, post } from '../../data/service/api';
import { enqueueSnackbar } from 'notistack';
import { nanoid } from 'nanoid';
import { useAuth } from '../../uath/AuthenticationContex';

// Define individual rating question component
const RatingQuestion = ({ question, rating, setRating }) => {
  const [hover, setHover] = useState(-1);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6">{question}</Typography>
      <Box sx={{ display: 'flex', gap: 0.5 }}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Box
            key={index}
            sx={{ cursor: 'pointer' }}
            onClick={() => setRating(index + 1)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(-1)}
          >
            {rating > index || hover >= index ? (
              <Star sx={{ color: '#ffb400' }} />
            ) : (
              <StarBorder sx={{ color: '#ffb400' }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// Main FeedbackRating component
const FeedbackRating = () => {
  const questions = [
    "How would you rate the overall user experience?",
    "How satisfied are you with the app's performance?",
    "How do you rate the design and usability of the app?",
  ];

  const [ratings, setRatings] = useState(Array(questions.length).fill(0));
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const uniqueId = nanoid();
    const { loggedInUserDetails } = useAuth();

  const handleRatingChange = (index, newRating) => {
    const newRatings = [...ratings];
    newRatings[index] = newRating;
    setRatings(newRatings);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = async () => {
    const feedbackData = {
      rating : Math.round(ratings.reduce((acc, rating, _, { length }) => acc + rating / length, 0)),
      comment: feedback,
      author: `${loggedInUserDetails.firstname} ${loggedInUserDetails.lastname ?? ''}`,
    };
    debugger
    // Send feedback data to the server (replace with your API endpoint)
     post({ table: "feedback", record: {...feedbackData, id: uniqueId} }).then((response) => {

      console.log('Success:', response);
      enqueueSnackbar('Feedback submitted successfully', { variant: 'success' });
      // Optionally clear the form after successful submission
      setRatings(ratings);
      setFeedback('');
      setSubmitted(true);
    }).catch((error) => {
        console.error('Error:', error);
        }
    );
  };

  return (
    !submitted ? <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'left',
        p: 2,
        gap: 2,
        width: '100%',
        maxWidth: 600,
        margin: '50px auto',
        border: '1px solid #ddd',
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" component="h2">
        Give Your Feedback
      </Typography>
      {questions.map((question, index) => (
        <RatingQuestion
          key={index}
          question={question}
          rating={ratings[index]}
          setRating={(newRating) => handleRatingChange(index, newRating)}
        />
      ))}
      <TextField
        label="Please provide Feedback about your thoughts regarding the app"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={feedback}
        onChange={handleFeedbackChange}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
    </Box> : <Box sx={{ textAlign: 'center', mt: 10 }}>
        <Typography variant="h4" component="h2">
            Thank you for your feedback!
        </Typography>
    </Box>
  );
};

export default FeedbackRating;
