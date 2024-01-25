import React, { useState } from 'react';
import './ProductCard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom'
import defaultImage from '../../assets/images/croc.png'
import { convertToSlug } from '../../utils/URLUtil';
const ProductCard = ({ productData }) => {
  const navigate = useNavigate();

  const navigateToProductDetails = () => {
    navigate(`/product-details/${convertToSlug(productData?.product_name)}-i${productData?.id}`, { replace: true });
  }

  return (
    <div className="productCardContainer" onClick={navigateToProductDetails}>
      <div className='productImageContainer'>
        <img src={productData?.product_image ? productData?.product_image : defaultImage} />
      </div>
      <h3>{productData?.product_name ? productData?.product_name : '-'}</h3>
    </div>
  );
};

export default ProductCard;
