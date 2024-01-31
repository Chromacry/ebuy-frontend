
import React, { useEffect, useState } from 'react';
import ConsoleBar from "../../Components/ConsoleBar/ConsoleBar"
import { useNavigate } from 'react-router-dom';
// import { verifyToken } from '../../Utils/VerifyToken';

function Admin() {
  const navigate = useNavigate();
  const [isValidToken, setIsValidToken] = useState(false);

  // useEffect(() => {
  //   // const checkToken = async () => {
  //   //   const result = await verifyToken();
  //   //   if (!result.valid) {
  //   //     alert('User is not valid, please login again');
  //   //     navigate('/admin-login');
  //   //   } else {
  //   //     setIsValidToken(true);
  //   //     console.log('User data:', result.data); 
  //   //   }
  //   // };
    
  //   // checkToken();
  // }, [navigate]);

  // if (!isValidToken) {
  //   return null; 
  // }

  return (
    <div className="body">
      <ConsoleBar/>
    </div>
  );
}

export default Admin;
