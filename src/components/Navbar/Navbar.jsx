import React, { useState, useEffect, useContext } from "react";
import "./Navbar.scss";
import { ThemeContext } from "../../App";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Logo from "../../assets/images/projectxLogo.png";
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import SearchBar from "../../components/SearchBar/SearchBar";
import DefaultProfileImg from "../../assets/images/DefaultProfileImg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let email;
  let userName;

  if (userInfo) {
    email = userInfo.email;
    userName = userInfo.username;
  }

  const userLoggedIn = !!userInfo;
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(true);
  const [isMobileMenuActiveVisible, setIsMobileMenuActiveVisible] = useState(false);

  const toggleMobileMenu = () => {
    window.scrollTo({
      top: window.scrollY - -60,
      behavior: "auto",
    });
    setIsMobileMenuVisible(!isMobileMenuVisible);
    setIsMobileMenuActiveVisible(!isMobileMenuActiveVisible);
  };
  useEffect(() => {
    if (isMobileMenuActiveVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuActiveVisible]);
  const location = useLocation();
  const handleCartClick = () => {
    window.location.href = "/cart";
  };
  const navLinks = [
    { path: "/", text: "Home" },
    { path: "/products", text: "Products" },
    { path: "/aboutUs", text: "About Us" },
  ];

  const handleLogout = (event) => {
    event.stopPropagation(); // Prevents event from propagating to parent elements
    localStorage.removeItem("userInfo");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };
  return (
    <div className="navbarContainer">
      <div className="navbar">
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
        <div className="links">
          {navLinks.map((navLink, index) => (
            <Link
              key={index}
              to={navLink.path}
              className={location.pathname === navLink.path ? "active" : ""}
            >
              {navLink.text}
            </Link>
          ))}
        </div>
        <SearchBar />

        <div className="iconContainer">
          <ThemeSwitch />
          <ProfileIcon />
          <button onClick={handleCartClick} className="cartButton">
            <FontAwesomeIcon icon={faShoppingCart} />
          </button>
        </div>
      </div>

      <div className={isMobileMenuVisible ? "mobileMenu" : "mobileMenu hidden"}>
        <div className="hamburgMenu" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faBars} />
        </div>
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
        <ThemeSwitch />
      </div>

      <div
        className={
          isMobileMenuActiveVisible
            ? "mobileMenuActive"
            : "mobileMenuActive hidden"
        }
      >
        <div className="closeAndToggle">
          <div className="mobileMenuClose" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <ThemeSwitch />
        </div>
        <div className="mobileMenuLinks">
          <div className="userInfo">
            <img src={DefaultProfileImg} alt="" srcset="" />
            <div>
              <p>{userName}</p>
              <p>{email}</p>
            </div>
          </div>
          <SearchBar />
          <div className="links">
            {navLinks.map((navLink, index) => (
              <Link
                key={index}
                to={navLink.path}
                className={location.pathname === navLink.path ? "active" : ""}
              >
                {navLink.text}
              </Link>
            ))}
          </div>
          <div className="userLinks">
            {userLoggedIn ? (
              <>
                <a href="#">Manage store</a>
                <a href="#">Settings</a>
                <a href="#" onClick={handleLogout}>
                  Logout
                </a>
              </>
            ) : (
              <>
                <a href="#">Login</a>
                <a href="#">Register</a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
