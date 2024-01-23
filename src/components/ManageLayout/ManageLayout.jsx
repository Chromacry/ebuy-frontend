import React, { useState } from "react";
import "./ManageLayout.scss";
import {
  Link,
  useLocation,
} from "react-router-dom";
import SideNavbar from "../SideNavbar/SideNavbar";
import { faBars, faTimes   } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProfileIcon from "../ProfileIcon/ProfileIcon";
import {NextUIProvider} from "@nextui-org/react";
const ManageLayout = ({ children }) => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(true);
  return (
    <NextUIProvider>
      <div className="manageLayoutContainer">
        <SideNavbar isOpen={isSideNavOpen} />
        <div className="layoutbody">
          <div className="managenavbar">
            { !isSideNavOpen
            ?
            <div className="hamburgMenu" onClick={() => setIsSideNavOpen(true)}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            :
            <div className="hamburgMenu" onClick={() => setIsSideNavOpen(false)}>
              <FontAwesomeIcon icon={faTimes} />
            </div> }
            <h1>Manage Project X Store</h1>
            <div className="iconContainer">
              <ProfileIcon />
            </div>
          </div>
          {children}
        </div>
      </div>
    </NextUIProvider>
  );
};

export default ManageLayout;
