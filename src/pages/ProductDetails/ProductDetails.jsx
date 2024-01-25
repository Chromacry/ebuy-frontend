import "./ProductDetails.scss";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import productImage from '../../assets/images/heel.png';
import { getProductApi } from "../../services/APIs/ProductApi";
import { addItemToCart, updateItemQuantityFromCart } from "../../utils/CartUtil";
const ProductDetails = () => {
  const { productId } = useParams();
  const indexOfLastI = productId.lastIndexOf('i');
  const itemId = productId.substring(indexOfLastI + 1);
  
  const [productQuantity, setProductQuantity] = useState(1);
  const [productDetails, setProductDetails] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
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
  }
  
  const addProductToCart = async () => {
    const body = {
      product_id: itemId,
      order_quantity: productQuantity,
      product_price: 40,
    }
    addItemToCart(body);
  }
  useEffect(() => {
    getProduct();
  }, [])
  return (
    <div className="body">
      <Navbar />
      <div className="product-wrapper">
        <div className="imageContainer">
          <img src={productDetails?.product_image} alt={productDetails?.product_name} />
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
            <p>star</p>
            <p>star</p>
            <p>star</p>
            <p>star</p>
            <p>star</p>
            <p>star</p>
          </div>
          <p>{productDetails?.product_description}</p>
          <div className="product-options">
            <h5>Quantity:</h5>
            <div className="quantity-button">
              <button className="quantity-action" onClick={() => setProductQuantity((productQuantity) => productQuantity <= 1 ? 1 : productQuantity - 1)}>-</button>
              <span className="quantity-display">{productQuantity}</span>
              <button className="quantity-action" onClick={() => setProductQuantity((productQuantity) => productQuantity + 1)}>+</button>
            </div>
          </div>
          <div className="buttonsCallToAction">
          <button onClick={addProductToCart}>Add To Cart</button>
          <button className="buyNowButton">Buy Now</button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
