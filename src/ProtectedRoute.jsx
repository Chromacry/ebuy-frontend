import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || '{}');
  const isSeller = userInfo && userInfo.is_seller === 1;

  console.log("User Info:", userInfo); // Debugging
  console.log("Is Seller:", isSeller); // Debugging

  return isSeller ? children : <Navigate to="/" />;
};

export default ProtectedRoute;