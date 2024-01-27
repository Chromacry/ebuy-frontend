// Cart.jsx
import React, { useState, useEffect } from "react";
import { getAllProductApi } from "../../services/APIs/ProductApi";
import "./Cart.scss";
import Navbar from "../../components/Navbar/Navbar";

export default function Cart() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAndStoreProducts = async () => {
      try {
        const response = await getAllProductApi();

        if (response.status === 200) {
          const productData = response.data;
          localStorage.setItem("products", JSON.stringify(productData));
          setProducts(productData);
        } else {
          console.error("Error fetching product data");
        }
      } catch (error) {
        console.error("Error fetching product data", error);
      }
    };
    fetchAndStoreProducts();
  }, []);

  const addProduct = async (e) => {
    try {
      e.preventDefault();
      setSuccessMessage("");
      setErrorMessage("");
      const formData = new FormData(e.target);
      const productName = formData.get("product_name");
      const productDescription = formData.get("product_description");
      const productQuantity = formData.get("product_quantity");
      const productImageFile = formData.get("product_image");
      const productImage = await imageToBase64(productImageFile);
      const body = {
        productName: productName,
        productDescription: productDescription,
        productQuantity: parseInt(productQuantity),
        productImage: productImage,
      };
      setFormkey(Date.now());
      const response = await addProductApi(body);
      if (response.status === 200) {
        const productName = formData.set("product_name", "");
        formData.set("product_description", "");
        formData.set("product_quantity", "");
        formData.set("product_image", "");
        setSuccessMessage(response.message);
        setTimeout(() => {
          getProductList();
          setSuccessMessage("");
          setErrorMessage("");
        }, 1500);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setErrorMessage(
        "An error occurred while adding a product: " + error.message
      );
    }
  };

  return (
    <div className="body">
      <Navbar />
      <section className="cart-container">
        {/* Your Cart Box */}
        <div className="cart-box">
          <h1 className="cart-title">Your Cart</h1>
          <div className="cart-title-line"></div>
          {products.map((product) => (
            <div key={product.id} className="cart-item">
    <img
      src={product.product_image}
      alt={product.product_name}
      className="cart-item-image"
    />
              <div className="product-details">
                <h3>{product.product_name}</h3>
                <p>{product.product_description}</p>
              </div>
              <div className="quantity">
                <label htmlFor={`quantity-${product.id}`}>Quantity:</label>
                <input
                  type="number"
                  id={`quantity-${product.id}`}
                  name={`quantity-${product.id}`}
                  min="1"
                  defaultValue="1"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Box */}
        <div className="summary-box">
          <h3>Summary</h3>
          {/* Add summary content here */}
        </div>

        {/* Collection and Delivery Option Box */}
        <div className="options-box">
          <h3>Collection and Delivery Option</h3>
          {/* Add options content here */}
        </div>
      </section>
    </div>
  );
}

// const addOrder = async (e) => {
//   try {
//     e.preventDefault();
//     setSuccessMessage("");
//     setErrorMessage("");
//     const formData = new FormData(e.target);
//     const orderQuantity = formData.get("order_quantity");
//     const orderStatus = formData.get("order_status");
//     const body = {
//       orderQuantity: orderQuantity,
//       orderStatus: orderStatus,
//     };
//     setFormkey(Date.now());
//     const response = await addProductApi(body);
//     if (response.status === 200) {
//       const productName = formData.set("product_name", "");
//       formData.set("product_description", "");
//       formData.set("product_quantity", "");
//       formData.set("product_image", "");
//       setSuccessMessage(response.message);
//       setTimeout(() => {
//         getProductList();
//         setSuccessMessage("");
//         setErrorMessage("");
//       }, 1500);
//     } else {
//       setErrorMessage(response.message);
//     }
//   } catch (error) {
//     console.error("Error occurred:", error);
//     setErrorMessage(
//       "An error occurred while adding a product: " + error.message
//     );
//   }
// };
