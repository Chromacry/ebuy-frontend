import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { applyAsSellerApi } from "../../services/APIs/UserApi";
import "./SellerRegister.scss";
const SellerRegister = () => {
  let email;
  let username;
  if (localStorage.getItem("userInfo")) {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    email = userInfo.email;
    username = userInfo.username;
  } else {
    window.alert("You are not Loggedin please log in first!");
    location.href = "/";
  }

  const handleCancel = () => {
    location.href = "/";
  }

  const handleSwitchAccount = () => {
    const confirmLogout = window.confirm("Are you sure you want to switch account? YOU WILL BE LOGGED OUT!");
    if (confirmLogout) {
        localStorage.removeItem("userInfo");
        setTimeout(() => {
            window.location.href = "/login";
        }, 1500);
  }}

  const handleApply = async () => {
  if (localStorage.getItem("userInfo")) {

    const response = await applyAsSellerApi();
    console.log(response.message, response.status)
    if (response.status === 200){
        window.alert("Successly applied as a seller");
        location.href = "/admin";
    } else {
        window.alert("Something went wrong, Please try again later");
        location.href = "/";
    }
  } else {
    window.alert("You are not Loggedin please log in first!");
    location.href = "/";
  }
  }

  return (
    <div className="sellerRegister">
      <Navbar />
      <div className="container">
        <div className="formCard">
          <div className="heading">
            <h1>Apply as seller</h1>
            <p>Apply as a seller with following account and information?</p>
          </div>
          <div className="detailContainer">
            
          <div className="detailLabel">
            <FontAwesomeIcon icon={faEnvelope} />
            <p>Email</p>
          </div>
          <div className="details">
            <p>{email}</p>
          </div>
          <div className="detailLabel">
            <FontAwesomeIcon icon={faUserCircle} />
            Username
          </div>
          <div className="details">
            <p>{username}</p>
          </div>
          </div>
          <div className="buttonContainer">
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleSwitchAccount}>Switch Account</button>
            <button onClick={handleApply}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerRegister;
