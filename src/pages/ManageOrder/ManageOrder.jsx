import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import DefaultProfileImg from "../../assets/images/DefaultProfileImg.jpg";
import ManageTable from "./ManageOrderTable/ManageOrderTable";
import Toast from "../../components/Toast/Toast";
import { rowsPerPage } from "../../constants/GlobalConstants";
import "./ManageOrder.scss";
import { deleteOrderApi, getAllOrderApi, getOrderListApi, updateOrderApi } from "../../services/APIs/OrderApi";
import { getUserApi } from "../../services/APIs/UserApi";

// OrderApi.js

function ManageOrder() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderList, setOrderList] = useState([]);
  const [tablePageOffset, setTablePageOffset] = useState(0);
  const [orderListCount, setOrderListCount] = useState(0);
  const [formkey, setFormkey] = useState(Date.now());
  const getOrderList = async () => {
    try {
      const body = {
        limit: rowsPerPage,
        offset: tablePageOffset,
      };
      const response = await getOrderListApi(body);
      console.log(response);
      if (response.status === 200) {
        setSuccessMessage(response.message);
        const resApiData = response.data;
        const resData = resApiData.data;
        console.log(resApiData.data);
        const resDataCount = resApiData.count;
        setOrderList(resData);
        setOrderListCount(resDataCount);
        setIsLoading(false);
        return response;
      } else {
        console.error("Error getting order list");
        return [];
      }
    } catch (error) {
      console.error("An error occurred:", error);
      return [];
    }
  };

  const deleteOrder = async (itemId) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (isConfirmed) {
      try {
        const response = await deleteOrderApi(itemId);
        if (response.status === 200) {
          setSuccessMessage(response.message);
          setTimeout(() => {
            getOrderList();
          }, 1500);
        } else {
          setErrorMessage(response.message);
        }
      } catch (error) {
        console.error("Error deleting member:", error);
        setErrorMessage("An error occurred while deleting the order.");
      }
    }
  };

  const updateOrder = async (e,id) => {
    try {
      console.log(e.target.value,id);
      setSuccessMessage("");
      setErrorMessage("");
      const body = {
        id: parseInt(id),
        orderStatus: e.target.value,
      };
      closeModal();
      const response = await updateOrderApi(body);
      if (response.status === 200) {
        setSuccessMessage(response.message);
        setTimeout(() => {
          closeModal();
          getOrderList();
        }, 1500);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage("An error occurred while updating the product.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSuccessMessage("");
    setErrorMessage("");
  };
  const handlePagination = (currentPage) => {
    const offset = (currentPage - 1) * rowsPerPage;
    setTablePageOffset(offset);
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div className="body">
      {successMessage && !isModalOpen ? (
        <Toast
          message={successMessage}
          position="bottomRight"
          backgroundColor="lightgreen"
          textColor="#000"
        />
      ) : (
        <></>
      )}
      {errorMessage ? (
        <Toast
          message={errorMessage}
          position="bottomRight"
          backgroundColor="#FF6E6E"
          textColor="#000000"
        />
      ) : (
        <></>
      )}
      <div className="tableTopBar"></div>
      <ManageTable
        data={orderList}
        dataCount={orderListCount}
        handlePagination={handlePagination}
        isLoading={isLoading}
        isModalOpen={isModalOpen}
        headers={[
          "Invoice",
          "Customer",
          "Date",
          "Amount",
          "Status",
          "Tracking",
        ]}
        handleModalIsOpen={(openStatus) => setIsModalOpen(openStatus)}
        handleUpdate={updateOrder}
        handleDelete={deleteOrder}
        handleCloseModal={closeModal}
      />
    </div>
  );
};

export default ManageOrder;
