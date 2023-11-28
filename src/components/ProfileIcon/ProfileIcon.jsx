import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import DefaultProfileImg from "../../assets/images/DefaultProfileImg.jpg";
import "./ProfileIcon.scss"; 

const ProfileIcon = ({ selectedItem, onItemClick }) => {
  
  const isMobile = window.innerWidth <= 600;
  const [popoverVisible, setPopoverVisible] = useState(isMobile);
  // ... other states and refs ...
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

        <div className="profileIcon" ref={iconRef} onClick={togglePopover}>
          <FontAwesomeIcon icon={faUserCircle} />
          {popoverVisible && (
            <div className="profilePopover" ref={popoverRef}>
              <div className="profileInfoContainer">
                <img src={DefaultProfileImg} alt="" srcset="" />
                <div>
                  <p>{userName}</p>
                  <p>{email}</p>
                </div>
              </div>

              <hr />
              <div className="profilePopoverLinks">
                <button onClick={handleSettingsClick}>Settings</button>
                <button>Logout</button>
              </div>
            </div>
          )}
        </div>

  );
};

export default ProfileIcon;
