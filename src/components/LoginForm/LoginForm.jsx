import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { loginApi} from '../../services/APIs/UserApi';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

import Banner from "../../assets/images/banner.png"
import './LoginForm.scss';

const LoginForm = () => {
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const login = async (e) => {
        e.preventDefault();
        setMessage('');
        setErrorMessage('');
    
        if (!formData.email || !formData.password) {
            setErrorMessage('Please fill out all fields.');
            return;
        }
    
            const response = await loginApi(formData);
            console.log(response)
            let responseMessage = response.message;
            let responseStatus = response.status;
            let responseToken = response.token;
            localStorage.setItem('token', responseToken)
            if(responseStatus == 200){
                setMessage(responseMessage);
                setTimeout(() => {
                    window.location.href = '/';
                }, 1500); 
            }
            else {
                setErrorMessage(responseMessage)
            }
            
    };
    

    return (

        <div className="loginFormContainer">

             <img src={Banner} alt="" srcset="" />
            <form onSubmit={login}>
                <div className="title"><h1>Login to your Account!</h1>
            <p>Don't have an account yet? <a href='/register'>Register here.</a></p></div>


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
                    <button type="button" onClick={togglePasswordVisibility} className="togglePassword">
                        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                    </button>
                </div>
                {message && <div className="formMessage"> <FontAwesomeIcon icon={faCheck} />  {message}</div>}
                {errorMessage && <div className="formErrorMessage"> <FontAwesomeIcon icon={faTimes} />  {errorMessage}</div>}
                <button type="submit">Login</button>



            </form>
            
        </div>
    );
};

export default LoginForm;
