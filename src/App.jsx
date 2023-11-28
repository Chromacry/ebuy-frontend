import React, { createContext, useState, useEffect } from "react";
import "./App.scss";
import Home from "./pages/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
export const ThemeContext = createContext(null);

const App = () => {
  const storedTheme = localStorage.getItem("theme") || "dark";
  const [theme, setTheme] = useState(storedTheme);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  
  useEffect(() => {
    // Check if the items are not already in localStorage
    if (!localStorage.getItem("FirstName")) {
      localStorage.setItem("Username", "John Doe");
      localStorage.setItem("LastName", "Doe");
      localStorage.setItem("Email", "johndoe@gmail.com");
      const firstName = localStorage.getItem("FirstName");
      const lastName = localStorage.getItem("LastName");
      // Combine FirstName and LastName to create UserName
      const userName = `${firstName} ${lastName}`;
      localStorage.setItem("UserName", userName);
    }
  }, []);

  return (
    <>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <div className="Theme" id={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
