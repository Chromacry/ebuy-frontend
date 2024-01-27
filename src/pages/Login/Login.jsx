import "./Login.scss";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import LoginForm from "../../components/LoginForm/LoginForm";

function Login() {
  return (
    <div className="loginBody">
      
      <section className="loginContainer">

          <Navbar />
          <div className="flexContainer">
            <LoginForm />
          </div>
      </section>
      
    </div>
  );
}
export default Login;
