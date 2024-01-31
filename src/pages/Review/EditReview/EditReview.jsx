import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "../EditReview/EditReview.scss";

import { getProductApi } from "../../../services/APIs/ProductApi";
import { useLocation, useParams } from "react-router-dom";
import StarSelector from "../../../components/StarSelector/StarSelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { imageToBase64 } from "@/utils/ImageEncodingUtil";
import { useNavigate } from "react-router-dom";
import { convertToSlug } from "../../../utils/URLUtil";
import {
  getReviewByReviewIdApi,
  updateReviewApi,
} from "../../../services/APIs/ReviewApi";


import EditReviewForm from "../../../components/EditReviewForm/EditReviewForm";

function EditReview() {
  return (
    <div className="body">
      <section className="loginContainer">
        <Navbar />
        <div className="flexContainer">
          <EditReviewForm/>
        </div>
      </section>
    </div>
  );
}
export default EditReview;
