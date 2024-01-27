import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import DefaultProfileImg from "../../assets/images/DefaultProfileImg.jpg";
import "./ProfileIcon.scss";

const ProfileIcon = ({ selectedItem, onItemClick }) => {
  const navigate = useNavigate();
  const isMobile = window.innerWidth <= 600;
  const [popoverVisible, setPopoverVisible] = useState(isMobile);
  const popoverRef = useRef(null);
  const iconRef = useRef(null);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let email;
  let userName;

  if (userInfo) {
    email = userInfo.email;
    userName = userInfo.username;
  }
  const userLoggedIn = !!userInfo;

  useEffect(() => {
    if (!localStorage.getItem("userInfo")) {
      setPopoverVisible(false);
  }
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

  const handleManageStoreClick = () => {
    navigate('/admin', { replace: true });
    setPopoverVisible(false);
  };

  const handleLogout = (event) => {
    event.stopPropagation();
    localStorage.removeItem("userInfo");
    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  };

  const handleLoginClick = () => {
    window.location.href = '/login';
  };

  const handleRegisterClick = () => {
    window.location.href = '/register';
  };

  return (
    <div className="profileIcon" ref={iconRef} onClick={togglePopover}>
      <FontAwesomeIcon icon={faUserCircle} />
      {popoverVisible && (
        <div className="profilePopover" ref={popoverRef}>
          {userInfo && ( // Render this block only if userInfo is available
            <div className="profileInfoContainer">
              <img src={DefaultProfileImg} alt="" srcset="" />
              <div>
                <p>{userName}</p>
                <p>{email}</p>
              </div>
            </div>
          )}
          {userLoggedIn && <hr />}



          <div className="profilePopoverLinks">
            {userLoggedIn ? (
              <>
                {userInfo && userInfo.is_seller === 1 && (
                  <button onClick={handleManageStoreClick}>Manage Store</button>
                )}
                <button onClick={handleSettingsClick}>Settings</button>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={handleLoginClick}>Login</button>
                <button onClick={handleRegisterClick}>Register</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileIcon;
