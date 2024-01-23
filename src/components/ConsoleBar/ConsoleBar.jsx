import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import ThemeSwitch from "../ThemeSwitch/ThemeSwitch";
import ConsoleNavbar from "../ConsoleNavbar/ConsoleNavbar";
import {
  faChartBar,
  faUser,
  faUsers,
  faInbox,
  faChevronCircleRight,
  faChevronCircleLeft,
  faExternalLinkAlt,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import SiteLogo from "../../assets/images/projectxLogo.png";
import DashboardComponent from "../Dashboard/Dashboard"; 
// import AccountComponent from "../Account/Account";
// import MembersComponent from "../Member/Member";
// import InboxComponent from "../../pages/Inbox";
import "./ConsoleBar.scss";
import { Link } from "react-router-dom";

const ConsoleBar = () => {
  const [showText, setShowText] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Dashboard");
  const selectedComponentRef = useRef(null);

  const toggleText = () => {
    setShowText(!showText);
  };

  const handleSelectedComponentClick = () => {
    if (showText) {
      toggleText();
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderSelectedComponent = () => {
    switch (selectedItem) {
      case "Dashboard":
        return <DashboardComponent />;
      case "Account":
        return <AccountComponent />;
      case "Members":
        return <MembersComponent />;
      case "Inbox":
        return <InboxComponent />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (selectedComponentRef.current) {
      selectedComponentRef.current.addEventListener(
        "click",
        handleSelectedComponentClick
      );
    }

    return () => {
      if (selectedComponentRef.current) {
        selectedComponentRef.current.removeEventListener(
          "click",
          handleSelectedComponentClick
        );
      }
    };
  }, [showText]);
  return (
    <div className="AdminConsoleBody">
      <div className={`admin-sidebar ${showText ? "show-text" : ""}`}>
        <div className="title">
          <img
            className={`Logo ${showText ? "show-text" : ""}`}
            src={SiteLogo}
            alt=""
            srcset=""
          />
          <button
            className={`toggle-button ${showText ? "right" : "left"}`}
            onClick={toggleText}
          >
            {showText ? (
              <FontAwesomeIcon icon={faChevronCircleLeft} size="2x" />
            ) : (
              <FontAwesomeIcon icon={faChevronCircleRight} size="2x" />
            )}
          </button>
        </div>
        {/* <div className={`SwitchTheme ${showText ? "show-text" : ""}`}>
          <p>Switch Theme</p>
          <ThemeSwitch />
        </div> */}

        <ul>
          <li
            className={selectedItem === "Dashboard" ? "selected" : ""}
            onClick={() => handleItemClick("Dashboard")}
          >
            <FontAwesomeIcon icon={faChartBar} /> {showText && "Dashboard"}
          </li>
          <li
            className={selectedItem === "Account" ? "selected" : ""}
            onClick={() => handleItemClick("Account")}
          >
            <FontAwesomeIcon icon={faUser} /> {showText && "Account"}
          </li>
          <li
            className={selectedItem === "Members" ? "selected" : ""}
            onClick={() => handleItemClick("Members")}
          >
            <FontAwesomeIcon icon={faUsers} /> {showText && "Members"}
          </li>
          <li
            className={selectedItem === "Inbox" ? "selected" : ""}
            onClick={() => handleItemClick("Inbox")}
          >
            <FontAwesomeIcon icon={faInbox} /> {showText && "Inbox"}
          </li>
        </ul>

        <div className={`Links ${showText ? "show-text" : ""}`}>
          <Link to={"/"}>
            <button className="site-button">
              <FontAwesomeIcon icon={faExternalLinkAlt} />
              {showText && "Go to Site"}
            </button>
          </Link>
          <button className="logout-button">
            <FontAwesomeIcon icon={faSignOutAlt} />
            {showText && "Logout"}
          </button>
        </div>
      </div>
      <div
        ref={selectedComponentRef}
        className={`SelectedComponent ${showText ? "show-text" : ""}`}
      >
        <ConsoleNavbar
          selectedItem={selectedItem}
          onItemClick={handleItemClick}
        />

        <div className="ComponentRender">{renderSelectedComponent()}</div>
      </div>
    </div>
  );
};

export default ConsoleBar;
