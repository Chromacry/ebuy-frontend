import React, { useState, useEffect } from "react";
import {
  getAllProductApi,
  getProductApi,
} from "../../services/APIs/ProductApi";
import "./Cart.scss";
import Navbar from "../../components/Navbar/Navbar";
import { addOrderApi } from "../../services/APIs/OrderApi";
import Toast from "../../components/Toast/Toast";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [updatedCartProducts, setCartProducts] = useState([]);
  const [productList, setProductList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [formkey, setFormkey] = useState(Date.now());
  const handleDecrease = () => {
    setOrderQuantity((prevQuantity) => (prevQuantity <= 1 ? 1 : prevQuantity - 1));
  };
  const handleIncrease = () => {
    setOrderQuantity((prevQuantity) => prevQuantity + 1);
  };

  const cartGetProductById = async () => {
    try {
      const cartData = localStorage.getItem("cart");
      const productArray = JSON.parse(cartData);
      const updatedCartProducts = [];

      for (let i = 0; i < productArray.length; i++) {
        const response = await getProductApi(productArray[i].product_id);
        if (response?.status === 200) {
          console.log(`Product ${i + 1}: status = 200`, response);
          updatedCartProducts.push(response);
        } else {
          console.log(`Product ${i + 1}: ${response.message}`);
        }
      }
      setProductList(productArray);
      console.log(productArray);

      // Move setCartProducts outside of the loop
      setCartProducts((prevCartProducts) => [
        ...prevCartProducts,
        ...updatedCartProducts,
      ]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addOrder = async (e) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");
      const cart_items = productList;
      const body = {
        cart_items: cart_items,
      };
      setFormkey(Date.now());
      
      const response = await addOrderApi(body);
      if (response.status === 200) {
        localStorage.removeItem("cart");
        setSuccessMessage(response.message);
        setTimeout(() => {
          setSuccessMessage("");
          setErrorMessage("");
          
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }, 1500);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setErrorMessage(
        "An error occurred while adding a order: " + error.message
      );
    }
  };

  // const updateItem = (data) => {
  //   let cartData = [];
  
  //   // Check if "cart" key exists in sessionStorage
  //   if (sessionStorage.getItem("cart") !== null) {
  //     // Retrieve current cart data from sessionStorage
  //     cartData = JSON.parse(sessionStorage.getItem("cart"));
  
  //     // Check if the product with the given product_id already exists in the cart
  //     const existingItemIndex = cartData.findIndex(item => item.product_id === data.product_id);
  
  //     if (existingItemIndex !== -1) {
  //       // If the product exists, update the order_quantity
  //       cartData[existingItemIndex].order_quantity = data.order_quantity;
  //     } else {
  //       // If the product does not exist, add it to the cart
  //       cartData.push(data);
  //     }
  //   } else {
  //     // If "cart" key does not exist, create a new cart with the given data
  //     cartData.push(data);
  //   }
  
  //   // Save the updated cart data to sessionStorage
  //   sessionStorage.setItem("cart", JSON.stringify(cartData));
  // };

  // const updateOrderQuantity = async () => {
  //   const body = {
  //     order_quantity: orderQuantity,
  //   };
  //   updateItem(body);
  // };


  useEffect(() => {
    cartGetProductById();
    // updateOrderQuantity(orderQuantity);
  }, [orderQuantity]);

  return (
    <div className="body">
      {successMessage ? (
        <Toast
          message={successMessage}
          position="bottomRight"
          backgroundColor="lightgreen"
          textColor="#000"
        />
      ) : (
        <></>
      )}
      {errorMessage ? (
        <Toast
          message={errorMessage}
          position="bottomRight"
          backgroundColor="#FF6E6E"
          textColor="#000000"
        />
      ) : (
        <></>
      )}
      <Navbar />
      <section className="cart-wrapper">
        <h1 className="cart-title">Your Cart</h1>
        <div className="cart-box">
          {updatedCartProducts.map((data) => (
            <div key={data.data[0].id} className="cart-item">
              <div className="cart-container">
                <img
                  src={data.data[0].product_image}
                  alt={data.data[0].product_name}
                  className="cart-item-image"
                />
              </div>
              <div className="order-content">
                <div className="store-profile">
                  <img
                    src={data.data[0].product_image}
                    alt={"store profile"}
                    style={{ width: "50px", height: "50px" }}
                  />
                  <h4>Nike Store</h4>
                </div>
                <h2>{data.data[0].product_name}</h2>
                <p>{data.data[0].product_description}</p>
                <div className="order-options">
                  <h5>Quantity:</h5>
                  <div className="quantity-button">
                    <button
                      className="quantity-action"
                      onClick={handleDecrease}
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {data.data[0].product_quantity}
                    </span>
                    <button
                      className="quantity-action"
                      onClick={handleIncrease}
                      >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="buttonsCallToAction">
          <button onClick={addOrder}>Check Out</button>
        </div>
      </section>
    </div>
  );
}
