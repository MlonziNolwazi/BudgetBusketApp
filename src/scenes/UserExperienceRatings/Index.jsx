import React, { useEffect } from 'react';
import ReviewCard from '../../components/ReviewCard';
import Header from '../../components/Header';
import { Box } from '@mui/material';
import { useState } from 'react';
import { get } from '../../data/service/api';



const Index = () => {

    const [reviews, setReviews] = useState([]);
    useEffect(() => {
        // Fetch reviews from the server
        // setReviews(data);
        get({ table: 'feedback' }).then((data) => {

           data.length > 0 &&  setReviews(data);
        });
        }
    , []);


  return (
    <>
     <Box m="20px">
      <Header title="User Experience Feedback and Ratings" subtitle="List of ratings" />
      </Box>
    <div>
    {reviews.map((review, index) => (
      <><ReviewCard
        key={index}
        rating={review.rating}
        date={review.date || new Date().toLocaleDateString()} 
        comment={review.comment}
        author={review.author}
      />
       <br/>
      </>
    ))}
  </div>

  </>
  );
};

export default Index;
