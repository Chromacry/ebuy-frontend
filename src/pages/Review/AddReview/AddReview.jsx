import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import '../AddReview/AddReview.scss';

import { getProductApi } from "../../../services/APIs/ProductApi";
import { useLocation, useParams , useNavigate} from "react-router-dom";
import StarSelector from "../../../components/StarSelector/StarSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { imageToBase64 } from "@/utils/ImageEncodingUtil";
import { addReviewApi } from "../../../services/APIs/ReviewApi";
import { convertToSlug } from "../../../utils/URLUtil";

import AddReviewForm from "../../../components/AddReviewForm/AddReviewForm";
function AddReview() {

  return (
    <div className="body">
      <section className="loginContainer">
        <Navbar />
        <div className="flexContainer">
        <AddReviewForm/>
        </div>
      </section>
    </div>
  );
}
export default AddReview;
