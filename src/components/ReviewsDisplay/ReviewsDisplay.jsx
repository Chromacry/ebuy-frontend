import React from "react";
import ReviewCard from "../ReviewCard/ReviewCard";
const ReviewsDisplay = ({ reviews,updateKey,setUpdateKey, currentUserId }) => {
  return (
    <>
      {reviews.map((review) => (
        <ReviewCard
          review={review}
          currentUserId={currentUserId}
          updateKey={updateKey}
          setUpdateKey={setUpdateKey}
        />
      ))}
    </>
  );
};
export default ReviewsDisplay;
