import React, { useState, useRef } from "react";
import { imageToBase64 } from "@/utils/ImageEncodingUtil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./AddProductModalForm.scss";

const AddProductModalForm = ({ handleAdd }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [member, setMember] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    const base64 = await imageToBase64(file);
    setMember({ ...member, product_image: base64 });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const base64 = await imageToBase64(file);
    setMember({ ...member, product_image: base64 });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  
  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <form className="addMemberForm" onSubmit={handleAdd}>
      <div className="rowContainer">
      <div className="formGroup">
        <input
          type="text"
          name="product_name"
          id="product_name"
          value={member?.product_name ? member?.product_name : ""}
          onChange={handleInputChange}
          required
          placeholder=" "
        />
        <label htmlFor="username">Product Name</label>
      </div>
      <div className="formGroup">
        <textarea
          type="text"
          name="product_description"
          id="product_description"
          value={member?.product_description ? member?.product_description : ""}
          onChange={handleInputChange}
          required
          placeholder=" "
        />
        <label htmlFor="product_description">Product Description</label>
      </div>
      <div className="formGroup">
        <input
          type="number"
          name="product_quantity"
          id="product_quantity"
          value={member?.product_quantity ? member?.product_quantity : ""}
          onChange={handleInputChange}
          required
          placeholder=" "
        />
        <label htmlFor="product_quantity">Product Quantity</label>
      </div>
      {/* <div className="formGroup departmentGroup">
        <select
          name="department"
          id="department"
          data-testid="department"
          value={member.department}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Department</option>
          <option value="Photography">Photography</option>
          <option value="Videography">Videography</option>
          <option value="Lighting">Lighting</option>
          <option value="Stage">Stage</option>
        </select>
      </div> */}
      
        
      </div>
      <div
        className={`DropArea ${member?.product_image ? "with-image" : ""}`}
        data-testid="drop-area"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={handleClick}
      >
        {member?.product_image ? (
          <img src={member?.product_image ? member?.product_image : ""}  alt="Preview" />
        ) : (
          <p>Click or Drag & Drop to Upload the Profile Picture</p>
        )}
      </div>
      <input
        name="product_image"
        type="file"
        data-testid="file-input"
        onChange={handleFileChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />
      <div className="formGroup">
        <button type="submit">Confirm</button>
      </div>{" "}
      {/* {message && (
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
      )} */}
    </form>
  );
};

export default AddProductModalForm;
