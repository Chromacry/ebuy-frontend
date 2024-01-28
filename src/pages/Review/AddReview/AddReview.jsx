import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import '../AddReview/AddReview.scss';
import { getProductApi } from "../../../services/APIs/ProductApi";
import { useLocation, useParams , useNavigate} from "react-router-dom";
import StarSelector from "../../../components/StarSelector/StarSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { imageToBase64 } from "@/utils/ImageEncodingUtil";
import { addReviewApi } from "../../../services/APIs/ReviewApi";
import { convertToSlug } from "../../../utils/URLUtil";
function AddReview() {
  const navigate = useNavigate();
  const { productId } = useParams();
  const indexOfLastI = productId.lastIndexOf("i");
  const itemId = productId.substring(indexOfLastI + 1);
  const [productDetails, setProductDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({
    rating: 0,
    productId: parseInt(itemId),
    userId: JSON.parse(localStorage?.getItem("userInfo")).id,
  });
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
  const getProduct = async () => {
    try {
      const response = await getProductApi(itemId);
      if (response?.status === 200) {
        setSuccessMessage(response.message);
        const resApiData = response.data;
        setProductDetails(resApiData[0]);
        setIsLoading(false);
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
  const navigateToProductDetails = () => {
    navigate(`/product-details/${convertToSlug(productDetails?.product_name)}-i${productDetails?.id}`, { replace: true });
  }
  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      console.log(review);
      const body={
        "reviewContent" : review?.content,
        "userId":review?.userId,
        "reviewRating":review?.rating,
        "productId":review?.productId,
        "reviewImage":review?.review_image,
    }
      const response = await addReviewApi(body);
      if (response?.status === 200) {
        setSuccessMessage(response.message);
        const resApiData = response.data;
        navigateToProductDetails();
        setIsLoading(false);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error retrieving product:", error);
      setErrorMessage("An error occurred while retrieving the product.");
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  console.log(JSON.parse(localStorage?.getItem("userInfo")).id);
  console.log(review);
  return (
    <div className="body">
      <section className="loginContainer">
        <Navbar />
        <div className="flexContainer">
          <form className="addReviewForm" onSubmit={handleAdd}>
            <h1>Create Review</h1>
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
export default AddReview;
