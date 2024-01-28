import "./ManageProduct.scss";
import React, { useState, useEffect, useRef } from "react";
import { imageToBase64 } from "@/utils/ImageEncodingUtil";
import ManageTable from "./ManageProductTable/ManageProductTable";
import {
  addProductApi,
  deleteProductApi,
  getAllProductApi,
  getProductListApi,
  updateProductApi,
} from "../../services/APIs/ProductApi";
import Toast from "../../components/Toast/Toast";
import { rowsPerPage } from "../../constants/GlobalConstants";
import AddProductModalForm from "./AddProductModalForm/AddProductModalForm";
function ManageProduct() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [productList, setProductList] = useState([]);
  const [tablePageOffset, setTablePageOffset] = useState(0);
  const [productListCount, setProductListCount] = useState(0);
  const [formkey, setFormkey] = useState(Date.now());
  const getProductList = async () => {
    try {
      const body = {
        limit: rowsPerPage,
        offset: tablePageOffset,
      };
      const response = await getProductListApi(body);
      console.log(response);
      if (response?.status === 200) {
        setSuccessMessage(response.message);
        const resApiData = response.data;
        const resData = resApiData.data;
        const resDataCount = resApiData.count;
        setProductList(resData);
        setProductListCount(resDataCount);
        setIsLoading(false);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error retrieving product:", error);
      setErrorMessage("An error occurred while retrieving the product.");
    }
  };

  const addProduct = async (e) => {
    try {
      e.preventDefault();
      setSuccessMessage("");
      setErrorMessage("");
      const formData = new FormData(e.target);
      const productName = formData.get("product_name");
      const productDescription = formData.get("product_description");
      const productQuantity = formData.get("product_quantity");
      const productImageFile = formData.get("product_image");
      const productImage = await imageToBase64(productImageFile);
      const body = {
        productName: productName,
        productDescription: productDescription,
        productQuantity: parseInt(productQuantity),
        productImage: productImage,
      };
      setFormkey(Date.now());
      const response = await addProductApi(body);
      if (response.status === 200) {
        const productName = formData.set("product_name", "");
        formData.set("product_description", "");
        formData.set("product_quantity", "");
        formData.set("product_image", "");
        setSuccessMessage(response.message);
        setTimeout(() => {
          getProductList();
          setSuccessMessage("");
          setErrorMessage("");
        }, 1500);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setErrorMessage(
        "An error occurred while adding a product: " + error.message
      );
    }
  };

  const updateProduct = async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData(e.target);
      const itemId = e.target.getAttribute("itemID");
      const productName = formData.get("product_name");
      const productDescription = formData.get("product_description");
      const productQuantity = formData.get("product_quantity");
      const productImageFile = formData.get("product_image");
      const productImage = await imageToBase64(productImageFile);
      setSuccessMessage("");
      setErrorMessage("");
      const body = {
        id: parseInt(itemId),
        productName: productName,
        productDescription: productDescription,
        productQuantity: productQuantity,
        productImage: productImage,
      };
      closeModal();
      const response = await updateProductApi(body);
      if (response.status === 200) {
        setSuccessMessage(response.message);
        setTimeout(() => {
          closeModal();
          getProductList();
        }, 1500);
      } else {
        setErrorMessage(response.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setErrorMessage("An error occurred while updating the product.");
    }
  };

  const deleteProduct = async (itemId) => {
      try {
        const response = await deleteProductApi(itemId);
        if (response.status === 200) {
          setSuccessMessage(response.message);
          setTimeout(() => {
            getProductList();
          }, 1500);
        } else {
          setErrorMessage(response.message);
        }
      } catch (error) {
        console.error("Error deleting member:", error);
        setErrorMessage("An error occurred while deleting the product.");
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
    getProductList();
  }, []);
  return (
    <div className="body">
      {successMessage ? (
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
        data={productList}
        dataCount={productListCount}
        handlePagination={handlePagination}
        isLoading={isLoading}
        isModalOpen={isModalOpen}
        headers={[
          "Product Image",
          "Product Name",
          "Product Description",
          "Quantity",
        ]}
        handleModalIsOpen={(openStatus) => setIsModalOpen(openStatus)}
        handleDelete={deleteProduct}
        handleDeleteMessage={"Are you sure you want to delete this product?"}
        handleEdit={updateProduct}
        handleCloseModal={closeModal}
      />
      <div className="addFormContainer">
        <h3>Add New Product</h3>
        <AddProductModalForm key={formkey} handleAdd={addProduct} />
      </div>
    </div>
  );
}

export default ManageProduct;
