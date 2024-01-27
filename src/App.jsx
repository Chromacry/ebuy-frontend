import React, { createContext, useState, useEffect } from "react";
import "./App.scss";
import ProtectedRoute from "./ProtectedRoute";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/login";

import AddReview from "./pages/Review/AddReview/AddReview";
import EditReview from "./pages/Review/EditReview/EditReview";


import Cart from "./pages/Cart/Cart";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Admin from "./pages/Admin/Admin";
import { getUserApi } from "./services/APIs/UserApi";
import { getUserInfoFromLocalStorage, setUserInfoInLocalStorage } from "./utils/LocalStorageUntil";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
export const ThemeContext = createContext(null);

const App = () => {
  const storedTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const getUser = async () => {
    const response = await getUserApi();

    console.log(response.message)
    if (response.message === "Authenticated") {
        let accessToken = getUserInfoFromLocalStorage().accessToken;
        setUserInfoInLocalStorage({
            accessToken : accessToken,
            username: response.username,
            email: response.email,
            id: response.id,
            created_time: response.created_time,
            profile_image: response.profile_image,
            is_seller: response.is_seller
        });
    } else {
      console.log("logout initiated status not equal to 200")
      localStorage.removeItem("userInfo");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    }
};

if(localStorage.getItem("userInfo")){
  getUser();
}




const RouteChangeListener = () => {
  const location = useLocation();
  useEffect(() => {
    if (localStorage.getItem("userInfo")) {
      getUser();
    }
  }, [location]);
  return null; 
};


  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="Theme" id={theme}>
          <BrowserRouter>
          <RouteChangeListener/>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product-details/:productId" element={<ProductDetails />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route path="/admin" element={<Admin />} />
              <Route path="/add-review/:productId" element={<AddReview/>}/>
              <Route path="/edit-review/:reviewId"  element={<EditReview/>}/>

              <Route path="/cart" element={<Cart />} />
              <Route path="/admin" element={
                <ProtectedRoute>
                  <Admin />
                </ProtectedRoute>
              } />

            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
