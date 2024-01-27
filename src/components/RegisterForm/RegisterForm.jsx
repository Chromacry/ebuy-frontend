import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCediSign,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { registerApi } from "../../services/APIs/UserApi";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

import Banner from "../../assets/images/banner.png";
import "./RegisterForm.scss";

const RegisterForm = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const register = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrorMessage("");

    if (!formData.username || !formData.email || !formData.password) {
      setErrorMessage("Please fill out all fields.");
      return;
    }

    const response = await registerApi(formData);
    let responseMessage = response.message;
    let responseStatus = response.status;

    if (responseStatus == 200) {
      setMessage(responseMessage);
      setTimeout(() => {
        window.location.href = "/login";
      }, 1500);
    } else {
      setErrorMessage(responseMessage);
    }
  };

  return (
    <div className="registerFormContainer">
      <img src={Banner} alt="" srcset="" />
      <form onSubmit={register}>
        <div className="title">
          <h1>Create your Account!</h1>
          <p>
            Already got an account? <a href="/login">Login here.</a>
          </p>
        </div>

        <div className="formGroup">
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="username">Username</label>
        </div>

        <div className="formGroup">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="email">Email</label>
        </div>

        <div className="formGroup passwordGroup">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
          />
          <label htmlFor="password">Password</label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="togglePassword"
          >
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
          </button>
        </div>
        {message && (
          <div className="formMessage">
            {" "}
            <FontAwesomeIcon icon={faCheck} /> {message}
          </div>
        )}
        {errorMessage && (
          <div className="formErrorMessage">
            {" "}
            <FontAwesomeIcon icon={faTimes} /> {errorMessage}
          </div>
        )}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
