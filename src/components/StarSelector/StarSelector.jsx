import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const StarSelector = ({rating, setRating,review}) => {
  

  const handleStarClick = (selectedRating) => {
    setRating({ ...review, rating: selectedRating });
  };

  return (
    <div className='starSelector'>
      {[1, 2, 3, 4, 5].map((star,index) => (
        <FontAwesomeIcon
          key={star}
          data-testid={`${index+1}`}
          icon={star <= rating ? faStar : faStar}
          color={star <= rating ? 'gold' : 'grey'}
          onClick={() => handleStarClick(star)}
          style={{ cursor: 'pointer' }}
          fontSize={21}
        />
      ))}
    </div>
  );
};

export default StarSelector;
