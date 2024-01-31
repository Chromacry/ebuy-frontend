import "./Register.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import RegisterForm from "../../components/RegisterForm/RegisterForm";
function Register() {
  return (
    <div className="body">
      
      <section className="registerContainer">

          <Navbar />
          <div className="flexContainer">
            <RegisterForm />
          </div>
      </section>
      
    </div>
  );
}
export default Register;
