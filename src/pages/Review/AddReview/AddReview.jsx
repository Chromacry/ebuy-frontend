import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import '../AddReview/AddReview.scss';

import AddReviewForm from "../../../components/AddReviewForm/AddReviewForm";
function AddReview() {

  return (
    <div className="body">
      <section className="loginContainer">
        <Navbar />
        <div className="AddReviewFormContainer">
        <AddReviewForm/>
        </div>
      </section>
    </div>
  );
}
export default AddReview;
