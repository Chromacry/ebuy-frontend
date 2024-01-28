import React, { useEffect, useState, useRef } from "react";
import StarSelector from "../StarSelector/StarSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { imageToBase64 } from "@/Utils/ImageEncodingUtil";
import { addReviewApi } from "../../services/APIs/ReviewApi";
import { convertToSlug } from "../../utils/URLUtil";
import { useNavigate,useParams } from "react-router";
import { getProductApi } from "../../services/APIs/ProductApi";
const AddReviewForm = ()=>{
  const navigate = useNavigate();
  const { productId } = useParams();
  const indexOfLastI = productId.lastIndexOf("i");
  const itemId = productId.substring(indexOfLastI + 1);
  const [productDetails, setProductDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [review, setReview] = useState({
    rating: 0,
    productId: parseInt(itemId),
  });
  const getProduct = async () => {
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


  
  useEffect(() => {
    getProduct();
  }, []);
  
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
        "reviewRating":review?.rating,
        "productId":review?.productId,
        "userId": 273,
        "reviewImage":review?.review_image || "image",
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
  return(<form className="addReviewForm" onSubmit={handleAdd}>
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
    data-testid="image-drop-area"
    onClick={handleClick}
    onDrop={handleDrop}
    onDragOver={handleDragOver}
  >
    {review?.review_image ? (
      <img
        src={review?.review_image ? review?.review_image : ""}
        alt="Preview"
        data-testid='addTarget'
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
  data-testid='reviewContentTextArea'
    value={review?.content ? review?.content : ""}
    name="content"
    onChange={handleInputChange}
    className="content-area"
    required
  ></textarea>
  <button type="submit" className="submit-button" data-testid='submit-button'>
    Submit
  </button>
</form>);
}
export default AddReviewForm;