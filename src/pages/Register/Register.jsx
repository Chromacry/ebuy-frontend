import "./Register.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
import Banner from "../../assets/images/banner.png"
import Logo from "../../assets/images/projectxLogo.png"
import Banner2 from '../../assets/images/Banner2.png'
import ImageCarousel from "../../components/ImageCarousel/imageCarousel";
import RegisterBanner from '../../assets/images/registerBanner.png'
ImageCarousel
function Register() {
  return (
    <div className="body">
      
      <section className="registerContainer">

          <Navbar />
          <div className="flexContainer">
            {/* <div className="heading">
              <img src={Logo} alt="" srcset="" />
              <h1>PROJECT X</h1>
            </div> */}
            <RegisterForm />
            {/* <img src={Banner} alt="" srcset="" /> */}
          </div>
      </section>
      
    </div>
  );
}
export default Register;
