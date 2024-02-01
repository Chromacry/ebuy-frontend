import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import "../EditReview/EditReview.scss";

import EditReviewForm from "../../../components/EditReviewForm/EditReviewForm";

function EditReview() {
  return (
    <div className="body">
      <section className="loginContainer">
        <Navbar />
        <div className="EditReviewFormContainer">
          <EditReviewForm/>
        </div>
      </section>
    </div>
  );
}
export default EditReview;
