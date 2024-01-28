import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashAlt,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./ManageOrderTable.scss";
import { imageToBase64 } from "@/utils/ImageEncodingUtil";
import { rowsPerPage } from "../../../constants/GlobalConstants";
import { convertToReadableDateTime } from "../../../utils/DateTimeUtil";
const ManageTable = ({
  data,
  dataCount,
  handlePagination,
  isModalOpen,
  handleModalIsOpen,
  isLoading,
  handleEdit,
  handleUpdate,
  handleDelete,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [editedOrderStatus, setEditedOrderStatus] = useState("");
  const [editedOrderStatusMap, setEditedOrderStatusMap] = useState({});

  const fileInputRef = useRef(null);

  //* Initialize pagination pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataCount / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  //   const handleOpenEditModal = (data) => {
  //     setSelectedMember(data);
  //     setEditedOrderStatus(data.order_status);
  //     handleModalIsOpen(true);
  //     console.log(data);
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    try {
      const promises = Object.keys(editedOrderStatusMap).map(async (id) => {
        const body = {
          id: id,
          orderStatus: editedOrderStatusMap[id],
        };
        const response = await updateOrder(body);
        return response;
      });

      const responses = await Promise.all(promises);

      // Check if all responses are successful
      const isSuccess = responses.every((response) => response.status === 200);

      if (isSuccess) {
        setMessage("Orders updated successfully");
        setTimeout(() => {
          handleModalIsOpen(false);
          handlePagination(currentPage);
        }, 1500);
      } else {
        setErrorMessage("Error updating orders");
      }
    } catch (error) {
      console.error("Error updating orders:", error);
      setErrorMessage("An error occurred while updating the orders.");
    }
  };

  return (
    <div className="memberTable">
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Quantity</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Tracking</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan="6">
                  <div
                    className="skeleton-container"
                    data-testid="skeleton-loader"
                  >
                    {[...Array(5)].map((_, index) => (
                      <div key={index} className="skeleton-row"></div>
                    ))}
                  </div>
                </td>
              </tr>
            ) : data.length === 0 ? (
              <div className="noDatafoundText">
                <h5>No Order found. Add a new order.</h5>
              </div>
            ) : (
              data?.map((data) => (
                <tr key={data?.id}>
                  <td>{data?.tracking_number}</td>
                  <td>{data?.username}</td>
                  <td>{convertToReadableDateTime(data?.created_time)}</td>
                  <td>{data?.order_quantity}</td>
                  <td>{data?.product_price}</td>
                  <td>
                    <div className="custom-dropdown">
                      <select
                        name="order_status"
                        value={
                          editedOrderStatusMap[data.id] || data.order_status
                        }
                        onChange={(e) => {
                          setEditedOrderStatusMap((prev) => ({
                            ...prev,
                            [data.id]: e.target.value,
                          }));
                          handleUpdate(e,data.id);
                        }}

                      >
                        <option value="Paid">Paid</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>
                  </td>
                  <td>{data?.tracking_number}</td>
                  <td>
                    <button
                      className="memberDeleteBtn"
                      onClick={() => handleDelete(data?.id)}
                    >
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <button type="submit" style={{ display: "none" }}></button>
      </form>
      <ul className="pageNumbers">
        {pageNumbers.map((number) => (
          <li
            key={number}
            id={number}
            onClick={() => {
              setCurrentPage(number);
              handlePagination(number);
            }}
            className={currentPage === number ? "current" : ""}
          >
            {number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageTable;
