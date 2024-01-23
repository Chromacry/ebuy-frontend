import React, { createContext, useState, useEffect } from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserApi } from "./services/APIs/UserApi";
import { getUserInfoFromLocalStorage, setUserInfoInLocalStorage } from "./utils/LocalStorageUntil";
export const ThemeContext = createContext(null);

const App = () => {
  const storedTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  const getUser = async (e) => {
     const response = await getUserApi();
     let accessToken = getUserInfoFromLocalStorage().accessToken
     setUserInfoInLocalStorage({
      accessToken : accessToken,
      username: response.username,
      email: response.email,
      id: response.id,
      created_time: response.created_time,
      profile_image: response.profile_image

     })
        console.log(response)
};
if(localStorage.getItem("userInfo")){
  getUser();
}


  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="Theme" id={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
