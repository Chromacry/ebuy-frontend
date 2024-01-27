import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import DefaultProfileImg from "../../assets/images/DefaultProfileImg.jpg";
import "./OrderTable.scss"; 

export default function OrderList() {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        async function getOrderListBySellerId() {
          const response = await fetch(`http://localhost:5050/orders/`);
    
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const orders = await response.json();
          setOrder(orders);
        }
    
        getOrderListBySellerId();
      }, []);
    }
