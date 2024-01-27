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
const ProductDetails = () => {
  const { productId } = useParams();
  const indexOfLastI = productId.lastIndexOf("i");
  const itemId = productId.substring(indexOfLastI + 1);

  const [productQuantity, setProductQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
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
        const resApiData = response.data;
        setReviews(resApiData);
        setIsLoading(false);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error retrieving review:", error);
      setErrorMessage("An error occurred while retrieving the review.");
    }
  };

  const getUsers = async (userIds) => {
    try {
      console.log(userIds);
      let body = {
        userIds: userIds,
      };
      const response = await getUsersByUserIdApi(body);
      if (response?.status === 200) {
        setSuccessMessage(response.message);
        const resApiData = response.data;
        setUsers(resApiData);
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
  const navigateToEditReview = (reviewId) => {
    navigate(`/edit-review/${reviewId}`, { replace: true });
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
  const deleteReview = async (reviewId) => {
    if (window.confirm("Are you sure you want to delete your review?.")) {
      try {
        const response = await deleteReviewApi(reviewId);
        if (response?.status === 200) {
          setSuccessMessage(response.message);
          const resApiData = response.data;
          getReviews();
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
  const calculateRatingAverage = () => {
    let ratingAvg = 0;
    reviews?.forEach((review) => {
      ratingAvg += review.rating;
    });
    ratingAvg = ratingAvg / reviews?.length;
    return ratingAvg;
  };
  const convertDate = (isoDateString) => {
    const date = new Date(isoDateString);

    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );
    return formattedDate;
  };
  const getReviewUsers = () => {
    const userIDs = reviews.map((review) => review.user_id);
    return userIDs;
  };
  console.log(getReviewUsers());
  useEffect(() => {
    getProduct();
    getReviews();
  }, []);
  useEffect(() => {
    getUsers(getReviewUsers());
  }, [reviews]);
  console.log(users);
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
                -
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
        {reviews.map((review) => (
          <div className="review-card">
            <div className="pfp-name-container">
              <img
                className="pfp-container"
                src={
                  users.find((user) => user.id === review.user_id)
                    ?.profile_image || productDetails?.product_image
                }
                alt={
                  users.find((user) => user.id === review.user_id)?.username ||
                  productDetails?.product_name
                }
              />
              <h2>
                {users.find((user) => user.id === review.user_id)?.username ||
                  "Username"}
              </h2>
              {review?.user_id ==
              JSON.parse(localStorage?.getItem("userInfo")).id ? (
                <div className="poster-button-container">
                  <button
                    className="iconButton"
                    onClick={() => navigateToEditReview(review.id)}
                  >
                    <FontAwesomeIcon
                      icon={faEdit}
                      color="orange"
                      fontSize={27}
                    />
                  </button>
                  <button
                    className="iconButton"
                    onClick={() => deleteReview(review.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} color="red" fontSize={27} />
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
            <div className="rating-container">
              {renderStars(review?.rating)}
            </div>
            <h3>
              Reviewed in Singapore on {convertDate(review?.created_time)}
            </h3>
            <h3 className="review-content-text">{review.content}</h3>
            {review?.review_image &&
            /^data:image\/[a-z]+;base64,/.test(review?.review_image) ? (
              <div className="reviewImageContainer">
                <p className="image-text">Attached image:</p>
                <img
                  className="reviewImage"
                  src={`${review?.review_image}`}
                ></img>
              </div>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductDetails;
