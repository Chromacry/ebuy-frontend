import React, { useState, useEffect, useContext } from "react";
import "./Navbar.scss";
import { ThemeContext } from "../../App";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import Logo from '../../assets/images/projectxLogo.png'
import {
  Link,
  useLocation,
} from "react-router-dom";


const Navbar = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuVisible, setIsMobileMenuVisible] = useState(true);
  const [isMobileMenuActiveVisible, setIsMobileMenuActiveVisible] =
    useState(false);

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
      // Apply overflow: hidden to the body when menu is active
      document.body.style.overflow = "hidden";
    } else {
      // Reset overflow to auto when menu is not active
      document.body.style.overflow = "auto";
    }

    return () => {
      // Reset overflow to auto when component is unmounted
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuActiveVisible]);
  const location = useLocation();
  const navLinks = [
    { path: "/", text: "Home" },
    { path: "/aboutus", text: "About Us" },
    { path: "/gallery", text: "Gallery" },
    { path: "/backstage", text: "Backstage Pass" },
    { path: "/contact", text: "Contact Us" },
  ];
  return (
    <div className="NavbarContainer">
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
          <ThemeSwitch />
        </div>
      </div>

      <div className={isMobileMenuVisible ? "MobileMenu" : "MobileMenu hidden"}>
        <div className="HamburgMenu" onClick={toggleMobileMenu}>
          <i className="fa fa-bars fa-2x"></i>
        </div>
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
        <ThemeSwitch />
      </div>

      <div
        className={
          isMobileMenuActiveVisible
            ? "MobileMenuActive"
            : "MobileMenuActive hidden"
        }
      >
        <div className="CloseAndToggle">
          <div className="MobileMenuClose" onClick={toggleMobileMenu}>
            <i className="fa fa-times"></i>
          </div>
          <ThemeSwitch />
        </div>
        <div className="MobileMenuLinks">
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
      </div>
    </div>
  );
};

export default Navbar;
