import React, { useEffect, useState, useRef } from "react";
import StarSelector from "../../components/StarSelector/StarSelector";
import { imageToBase64 } from "@/Utils/ImageEncodingUtil";
import { convertToSlug } from "../../utils/URLUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getReviewByReviewIdApi,updateReviewApi } from "../../services/APIs/ReviewApi";
const EditReviewForm = () => {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const fileInputRef = useRef(null);
  const [review, setReview] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const base64 = await imageToBase64(file);
    setReview({ ...review, review_image: base64 });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await imageToBase64(file);
    setReview({ ...review, review_image: base64 });
  };
  const updateReview = async (e) => {
    e.preventDefault();
    try {
      const body = {
        reviewContent: review?.content,
        reviewRating: review?.rating,
        id: review?.id,
        reviewImage: review?.review_image,
      };
      const response = await updateReviewApi(body);
      if (response?.status === 200) {
        navigateToProductDetails();
        setSuccessMessage(response.message);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error retrieving product:", error);
      setErrorMessage("An error occurred while retrieving the product.");
    }
  };
  const navigateToProductDetails = () => {
    navigate(
      `/product-details/${convertToSlug(review.product_name)}-i${
        review.product_id
      }`,
      { replace: true }
    );
  };
  const getReviewByReviewId = async () => {
    try {
      const response = await getReviewByReviewIdApi(parseInt(reviewId));
      if (response?.status === 200) {
        setSuccessMessage(response.message);
        const resApiData = response.data;
        setReview(response.data[0]);
        setIsLoading(false);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error retrieving review:", error);
      setErrorMessage("An error occurred while retrieving the review.");
    }
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };
  useEffect(() => {
    getReviewByReviewId();
  }, []);
  return (
    <form className="addReviewForm" onSubmit={updateReview}>
      <h1>Edit Review</h1>
      <div className="product-img-name-container">
        <img src={review?.product_image} />
        <h3
          style={{ cursor: "pointer" }}
          onClick={() => navigateToProductDetails()}
        >
          {review?.product_name}
        </h3>
      </div>
      <h2>Overall rating</h2>
      <StarSelector
        rating={review?.rating}
        setRating={setReview}
        review={review}
      />
      {/* <h2>Add a headline</h2>
  <textarea
    name="reviewHeadline"
    value={review?.reviewHeadline ? review?.reviewHeadline: ""}
    onChange={handleInputChange}
    className="headline-area"
    required
  ></textarea> */}
      <h2>Add a photo</h2>
      <div
        className="image-drop-area"
        data-testid='image-drop-area'
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {review?.review_image ? (
          <img
          data-testid='addTarget'
            src={review?.review_image ? review?.review_image : ""}
            alt="Preview"
          />
        ) : (
          <FontAwesomeIcon
            icon={faPlus}
            color="#ccc"
            className="icon"
          ></FontAwesomeIcon>
        )}
      </div>{" "}
      <input
        name="review_image"
        type="file"
        data-testid="file-input"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <h2>Add a written review</h2>
      <textarea
        value={review?.content ? review?.content : ""}
        name="content"
        onChange={handleInputChange}
        className="content-area"
        data-testid='reviewContentTextArea'
        required
      ></textarea>
      <button type="submit" className="submit-button" data-testid='submit-button' id='edit-review-submit'>
        Submit
      </button>
    </form>
  );
};
export default EditReviewForm;
