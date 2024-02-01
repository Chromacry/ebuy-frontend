import React from 'react';
import './SellerRegistration.scss';
const SellerRegistration = () => {

    const handleApply = () => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        if (userInfo) {
            location.href = "/seller";
        } else {
            // Show a confirmation dialog
            const confirmLogin = window.confirm("You need to login first. Would you like to log in now?");
            if (confirmLogin) {
                // Redirect to login page
                window.location.href = '/login';
            }
        }
    }



  return (
    <div className='sellerRegistrationContainer'>
        <div className="flexContainer">
            <p>Not a seller? Apply to be one Now!!</p>
            <button id='applyButtonId' onClick={handleApply}>
                Apply
            </button>
        </div>

    </div>
  );
};

export default SellerRegistration;
