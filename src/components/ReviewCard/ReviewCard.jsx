import React from "react";
import {
  faStar,
  faEdit,
  faTrash,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router";
import defaultPfp from "../../assets/images/DefaultProfileImg.jpg";
import { deleteReviewApi } from "../../services/APIs/ReviewApi";
const ReviewCard = ({ review, currentUserId, updateKey, setUpdateKey }) => {
  const navigate = useNavigate();
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={faStar} color="gold" fontSize={20} />
      );
    }

    if (halfStars === 1) {
      stars.push(
        <FontAwesomeIcon icon={faStarHalfAlt} color="gold" fontSize={20} />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          color="gray"
          fontSize={20}
        />
      );
    }

    return stars;
  };
  const navigateToEditReview = (reviewId) => {
    navigate(`/edit-review/${reviewId}`, { replace: true });
  };
  const convertDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };
  const deleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete your review?.")) {
      try {
        const response = await deleteReviewApi(reviewId);
        if (response?.status === 200) {
          setUpdateKey(updateKey + 1);
          setSuccessMessage(response.message);
          const resApiData = response.data;

          setIsLoading(false);
        } else {
          setErrorMessage(response.message);
        }
      } catch (error) {
        console.error("Error deleting review:", error);
        setErrorMessage("An error occurred while deleting the review.");
      }
    }
  };
  return (
    <div className="review-card">
      <div className="pfp-name-container">
        <img
          className="pfp-container"
          src={review?.profile_image || defaultPfp}
          alt={review?.username}
        />
        <h2>{review?.username || "Username"}</h2>
        {review?.user_id == currentUserId ? (
          <div className="poster-button-container">
            <button
              className="iconButton"
              data-testid="editButton"
              onClick={() => navigateToEditReview(review.id)}
            >
              <FontAwesomeIcon icon={faEdit} color="orange" fontSize={27} />
            </button>
            <button
              className="iconButton"
              data-uitestid='deleteButton'
              data-testid={`trashButton${review.id}`}
              onClick={() => deleteReview(review.id)}
            >
              <FontAwesomeIcon icon={faTrash} color="red" fontSize={27} />
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className={`rating-container review-${review?.id}`}>
        {renderStars(review?.rating)}
      </div>
      <h3>
        Reviewed in Singapore on {convertDate(review?.created_time) || "time"}
      </h3>
      <h3 className="review-content-text">{review.content}</h3>
      {review?.review_image &&
      /^data:image\/[a-z]+;base64,/.test(review?.review_image) ? (
        <div className="reviewImageContainer">
          <p className="image-text">Attached image:</p>
          <img
            className="reviewImage"
            src={`${review?.review_image}`}
            alt="review_image"
          ></img>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
export default ReviewCard;
