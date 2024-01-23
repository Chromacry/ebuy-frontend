import React from "react";
import "./SideNavbar.scss";
import Logo from '../../assets/images/projectxLogo.png'
import {
  Link,
  useLocation,
} from "react-router-dom";


const SideNavbar = ({ isOpen }) => {
  return (
    <div className={`sidenavbarContainer ${isOpen}`}>
      <div className="sidenavbar">
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
        <h2 className="m-0">Project X</h2>
        <br/>
        <div className="sidenavButton">
          <Link to="/manage-product" >
            <h3 className="sidenavText">Manage Product</h3>
          </Link>
        </div>
        <div className="sidenavButton">
          <Link to="/manage-orders" >
            <h3 className="sidenavText">Manage Orders</h3>
          </Link>
        </div>
        <div className="sidenavButton">
          <Link to="/manage-reviews" >
            <h3 className="sidenavText">Manage Reviews</h3>
          </Link>
        </div>
        </div>
    </div>
  );
};

export default SideNavbar;
