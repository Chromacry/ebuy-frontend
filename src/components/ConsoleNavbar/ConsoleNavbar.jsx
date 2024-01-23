import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import DefaultProfileImg from "../../assets/images/DefaultProfileImg.jpg";
import "./ConsoleNavbar.scss";

const ConsoleNavbar = ({ selectedItem, onItemClick }) => {
  const [popoverVisible, setPopoverVisible] = useState(false);
  const popoverRef = useRef(null);
  const iconRef = useRef(null);
  const email = localStorage.getItem("Email");
  const userName = localStorage.getItem("UserName");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setPopoverVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const togglePopover = () => {
    setPopoverVisible(!popoverVisible);
  };

  const handleSettingsClick = () => {
    onItemClick("Account");
    setPopoverVisible(false);
  };

  return (
    <div className="ConsoleNavbarContainer">
      <div className="NavLeft">{selectedItem}</div>
      <div className="NavRight">
        <div className="ThemeSwitcher">
          <ThemeSwitch />
        </div>
        <div className="profile-icon" ref={iconRef} onClick={togglePopover}>
          <FontAwesomeIcon icon={faUserCircle} />
          {popoverVisible && (
            <div className="ProfilePopover" ref={popoverRef}>
              <div className="ProfileInfoContainer">
                <img src={DefaultProfileImg} alt="" srcset="" />
                <div>
                  <p>{userName}</p>
                  <p>{email}</p>
                </div>
              </div>

              <hr />
              <div className="ProfilePopoverLinks">
                <button onClick={handleSettingsClick}>Settings</button>
                <button>Logout</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsoleNavbar;
