import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashAlt,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./ManageProductTable.scss";
import { imageToBase64 } from "@/Utils/ImageEncodingUtil";
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
  handleDelete,
  handleDeleteMessage,

}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMember, setSelectedMember] = useState(null);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  //* Initialize pagination pages
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(dataCount / rowsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleInputChange = (e, field) => {
    setSelectedMember({ ...selectedMember, [field]: e.target.value });
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const base64 = await imageToBase64(file);
    setSelectedMember({ ...selectedMember, image: base64 });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await imageToBase64(file);
    setSelectedMember({ ...selectedMember, image: base64 });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleOpenEditModal = (data) => {
    setSelectedMember(data);
    handleModalIsOpen(true);
  };

  return (
    <div className="memberTable">
      <table>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Product Name</th>
            <th>Product Description</th>
            <th>Quantity</th>
            <th>Created At</th>
            <th>Actions</th>
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
          ) : (
            data.length === 0 ? <div className="noDatafoundText"><h5 >No Product found. Add a new product.</h5></div>
            :
            data?.map((data) => 
              <tr key={data?.id}>
                <td>
                  <img
                    src={data?.product_image}
                    alt={data?.product_name}
                    style={{ width: "50px", height: "50px" }}
                  />
                </td>
                <td>{data?.product_name}</td>
                <td>{data?.product_description}</td>
                <td>{data?.product_quantity}</td>
                <td>{convertToReadableDateTime(data?.created_time)}</td>
                <td>
                  <button
                    className="memberEditBtn"
                    onClick={() => handleOpenEditModal(data)}
                  >
                    <FontAwesomeIcon icon={faPen} />
                  </button>
                  <button
                    className="memberDeleteBtn"
                    onClick={() =>{
                      const confirmed = window.confirm(handleDeleteMessage ?? 'No message available');
                      if (confirmed) handleDelete(data?.id);
                    } }
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
      <ul className="pageNumbers">
        {pageNumbers.map((number) => (
          <li
            key={number}
            id={number}
            onClick={() => { setCurrentPage(number); handlePagination(number); }}
            className={currentPage === number ? "current" : ""}
          >
            {number}
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal">
          <div className="modalContent">
            <div className="titleAndClose">
              <h1>Edit Product</h1>{" "}
              <span className="close" onClick={() => handleModalIsOpen(false)}>
                &times;
              </span>
            </div>

            <form
              itemID={selectedMember ? selectedMember?.id : ""}
              className="editMemberForm"
              data-testid="edit-modal"
              onSubmit={handleEdit}
            >
              <div className="inputField">
                <label>Product Name</label>
                <input
                  name="product_name"
                  type="text"
                  value={selectedMember ? selectedMember?.product_name : ""}
                  onChange={(e) => handleInputChange(e, "product_name")}
                />
              </div>
              <div className="inputField">
                {" "}
                <label>Description</label>
                <textarea
                  name="product_description"
                  type="text"
                  value={selectedMember ? selectedMember?.product_description : ""}
                  placeholder="2200111A"
                  onChange={(e) => handleInputChange(e, "product_description")}
                />
              </div>
              <div className="inputField">
                {" "}
                <label>Quantity</label>
                <input
                  name="product_quantity"
                  type="number"
                  placeholder="1"
                  value={selectedMember ? selectedMember?.product_quantity : ""}
                  onChange={(e) => handleInputChange(e, "product_quantity")}
                />
              </div>
              {/* <div className="inputField">
                {" "}
                <label>Department</label>
                <select
                  value={selectedMember ? selectedMember.department : ""}
                  onChange={(e) => handleInputChange(e, "department")}
                >
                  <option value="Photography">Photography</option>
                  <option value="Videography">Videography</option>
                  <option value="Stage">Stage</option>
                  <option value="Lighting">Lighting</option>
                </select>
              </div> */}
              <div className="inputField">
                <label>Product Image</label>
                <div
                  className={`DropArea ${
                    selectedMember && selectedMember?.image ? "with-image" : ""
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleClick}
                >
                  {selectedMember && selectedMember?.image ? (
                    <img src={selectedMember?.image} alt="Product" />
                  ) : (
                    <p>Drag & Drop to Upload New Image</p>
                  )}
                  <p>Drag & Drop or Click to Upload New Image</p>
                </div>

                <input
                  type="file"
                  name="product_image"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  style={{ display: "none" }}
                />
              </div>

              <div className="formButtons">
                {" "}
                <button onClick={() => handleModalIsOpen(false)}>Cancel</button>
                <button type="submit">Save Changes</button>
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
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTable;
