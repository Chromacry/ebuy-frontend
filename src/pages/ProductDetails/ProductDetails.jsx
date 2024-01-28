import "./ProductDetails.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import productImage from "../../assets/images/heel.png";
import { getProductApi } from "../../services/APIs/ProductApi";
import { getUsersByUserIdApi } from "../../services/APIs/UserApi";
import {
  deleteReviewApi,
  getReviewByIdApi,
} from "../../services/APIs/ReviewApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../../utils/URLUtil";
import {
  faStar,
  faEdit,
  faTrash,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  addItemToCart,
  updateItemQuantityFromCart,
} from "../../utils/CartUtil";
import "../ManageProduct/ManageProductTable/ManageProductTable.scss";
import ReviewsDisplay from "../../components/ReviewsDisplay/ReviewsDisplay";
const ProductDetails = () => {
  const { productId } = useParams();
  const indexOfLastI = productId.lastIndexOf("i");
  const itemId = productId.substring(indexOfLastI + 1);

  const [productQuantity, setProductQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [updateKey,setUpdateKey] = useState(0);
  const navigate = useNavigate();
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
  const getReviews = async () => {
    try {
      const response = await getReviewByIdApi(itemId);
      if (response?.status === 200) {
        setSuccessMessage(response.message);
        console.log(response);
        const resApiData = response.data;
        setReviews(resApiData);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error retrieving review:", error);
      setErrorMessage("An error occurred while retrieving the review.");
    }
  };


  const addProductToCart = async () => {
    const body = {
      product_id: itemId,
      order_quantity: productQuantity,
      product_price: 40,
    };
    addItemToCart(body);
  };
  const navigateToAddReview = () => {
    navigate(
      `/add-review/${convertToSlug(productDetails?.product_name)}-i${
        productDetails?.id
      }`,
      { replace: true }
    );
  };

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

  const calculateRatingAverage = () => {
    let ratingAvg = 0;
    reviews?.forEach((review) => {
      ratingAvg += review.rating;
    });
    ratingAvg = ratingAvg / reviews?.length;
    return ratingAvg;
  };
  

  let currentUserId = JSON.parse(localStorage?.getItem('userInfo'))?.id;

  useEffect(() => {
    getProduct();
    getReviews();
  }, []);
  useEffect(()=>{
    getReviews()
  },[updateKey])
  console.log(productDetails);
  return (
    <div className="body">
      <Navbar />
      <div className="product-wrapper">
        <div className="imageContainer">
          <img
            src={productDetails?.product_image}
            alt={productDetails?.product_name}
          />
        </div>
        <div className="product-content">
          <div className="store-profile">
            <img
              src={productImage}
              alt={"store profile"}
              style={{ width: "50px", height: "50px" }}
            />
            <h4>Nike Store</h4>
          </div>
          <h2>{productDetails?.product_name}</h2>
          <div className="ratingStars">
            {renderStars(calculateRatingAverage())}
          </div>
          <p>{productDetails?.product_description}</p>
          <div className="product-options">
            <h5>Quantity:</h5>
            <div className="quantity-button">
              <button
                className="quantity-action"
                onClick={() =>
                  setProductQuantity((productQuantity) =>
                    productQuantity <= 1 ? 1 : productQuantity - 1
                  )
                }
              >
              </button>
              <span className="quantity-display">{productQuantity}</span>
              <button
                className="quantity-action"
                onClick={() =>
                  setProductQuantity((productQuantity) => productQuantity + 1)
                }
              >
                +
              </button>
            </div>
          </div>
          <div className="buttonsCallToAction">
            <button onClick={addProductToCart}>Add To Cart</button>
            <button className="buyNowButton">Buy Now</button>
          </div>
        </div>
      </div>
      <div className="review-wrapper">
        <div className="header-container">
          <h1 style={{ color: "white" }}>Reviews</h1>
          <button
            className="addReviewButton"
            onClick={() => navigateToAddReview()}
          >
            Add Review
          </button>
        </div>

        <br></br>
        <ReviewsDisplay reviews={reviews}  currentUserId={currentUserId} updateKey={updateKey} setUpdateKey={setUpdateKey}/>
      </div>
    </div>
  );
};

export default ProductDetails;
