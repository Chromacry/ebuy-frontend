import "./Home.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { loginApi } from "../../services/APIs/UserApi";
import banner from "../../assets/images/banner.png"
import ProductCard from "../../components/ProductCard/ProductCard";
import { getAllProductApi } from "../../services/APIs/ProductApi";
function Home() {
  const [allProductsData, setAllProductsData] = useState([]);
  const [typewriterText, setTypewriterText] = useState('');
  const typewriterPart = "ROJECT X"; // Part of the text for the typewriter effect
  const staticPart = "P"; // Static part of the text
  const typingSpeed = 100; // Speed of typing
  const typingPause = 1500; // Pause at the end before restarting
  const eraseSpeed = 50; // Speed of erasing
  const erasePause = 500; // Pause after erasing before typing again


  const startTypewriter = () => {
    let index = 0;
    let isTyping = true;

    const typeWriter = () => {
      if (isTyping) {
        if (index < typewriterPart.length) {
          setTypewriterText(typewriterPart.substring(0, index + 1));
          index++;
          setTimeout(typeWriter, typingSpeed);
        } else {
          setTimeout(() => {
            isTyping = false;
            index = typewriterPart.length;
            typeWriter(); // Start erasing
          }, typingPause);
        }
      } else {
        if (index > 0) {
          setTypewriterText(typewriterPart.substring(0, index - 1));
          index--;
          setTimeout(typeWriter, eraseSpeed);
        } else {
          setTimeout(() => {
            isTyping = true;
            typeWriter(); // Start typing again
          }, erasePause);
        }
      }
    };

    typeWriter();

    return () => {
      setTypewriterText(''); // Cleanup if the component unmounts
    };
  }

  const getAllProducts = async () => {
    try {
      const response = await getAllProductApi()
      if (response?.status === 200) {
        // setSuccessMessage(response.message);
        const resApiData = response.data;
        setAllProductsData(resApiData);
        // setIsLoading(false);
      } else {
        // setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error retrieving products:", error);
      // setErrorMessage("An error occurred while retrieving the products.");
    }
  }

  const loadAllProducts = () => {
    return allProductsData?.map((product) => {
      return (
        <ProductCard 
          key={product?.id}
          productData={product}
        />
      )
    })
  }
  useEffect(() => {
    startTypewriter();
    getAllProducts();
  }, []);

  return (
      <div className="body"><Navbar />
        <section className="heroSection">
          <div className="container">
            <div className="text">
            <h1>{staticPart}<span className="typewriter">{typewriterText}</span></h1>
            <div className="arrowBox">
            </div>
            <p>Discover Project X, Your One-Stop Shopping Haven! Explore our diverse range of products, from the newest tech wonders to stylish fashion and daily necessities. Enjoy a shopping experience where convenience, quality, and affordability meet. At Project X, we’re more than just a marketplace; we’re your partners in fulfilling every shopping need with ease and excellence. Join us now for an unparalleled shopping adventure, all in one place!</p>
            <button>Shop Now!</button>
          </div>
          <img src={banner} alt="" srcset="" />
          </div>
        </section>
        <div className="wrapper">
          <h2>All Products</h2>
          <div className="productContainer">
            {loadAllProducts()}
          </div>
        </div>
      </div>
  );
}

export default Home;
