import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "../EditReview/EditReview.scss";
import { getProductApi } from "../../../services/APIs/ProductApi";
import { useLocation, useParams } from "react-router-dom";
import StarSelector from "../../../components/StarSelector/StarSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { imageToBase64 } from "@/utils/ImageEncodingUtil";
import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../../../utils/URLUtil";
import {
  getReviewByReviewIdApi,
  updateReviewApi,
} from "../../../services/APIs/ReviewApi";

function EditReview() {
  const navigate = useNavigate();
  const { reviewId } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({});
  const fileInputRef = useRef(null);
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
  const getProduct = async (itemId) => {
    try {
      const response = await getProductApi(itemId);
      if (response?.status === 200) {
        setSuccessMessage(response.message);
        const resApiData = response.data;
        setProductDetails(resApiData[0]);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error retrieving product:", error);
      setErrorMessage("An error occurred while retrieving the product.");
    }
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
  const navigateToProductDetails = () => {
    navigate(`/product-details/${convertToSlug(productDetails?.product_name)}-i${productDetails?.id}`, { replace: true });
  }
  const updateReview = async (e) => {
    e.preventDefault()
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
  const handleClick = () => {
    fileInputRef.current.click();
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReview({ ...review, [name]: value });
  };

  useEffect(() => {
    //getProduct();
    getReviewByReviewId();
  }, []);
  useEffect(() => {
    getProduct(review.product_id);
  }, [review]);
  return (
    <div className="body">
      <section className="loginContainer">
        <Navbar />
        <div className="flexContainer">
          <form className="addReviewForm" onSubmit={updateReview}>
            <h1>Edit Review</h1>
            <div className="product-img-name-container">
              <img src={productDetails?.product_image} />
              <h3 style={{cursor:'pointer'}} onClick={()=>navigateToProductDetails()}>{productDetails?.product_name}</h3>
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
              onClick={handleClick}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              {review?.review_image ? (
                <img
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
              required
            ></textarea>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
export default EditReview;
