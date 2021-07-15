// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { Link } from "react-router-dom";
import "./general.css";

function Recommend() {
  return (
    <div className="rec_container">
      <h4 className="rec_head">Get Recommedations for the below fields</h4>
      <div className="rec_box">
        <Link to="/agri">
          <p className="agriculture">Agriculture</p>
        </Link>
        <Link to="/others">
          <p className="others">Others</p>
        </Link>
      </div>
    </div>
  );
}

export default Recommend;
