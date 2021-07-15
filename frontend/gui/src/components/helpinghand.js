// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { Link } from "react-router-dom";
import "./general.css";

function Hand() {
  return (
    <div className="rec_container">
      <h4 className="rec_head"></h4>
      <div className="rec_box">
        <Link to="/resource/">
          <p className="agriculture">Opportunities</p>
        </Link>
        <Link to="/help/">
          <p className="others">Donation</p>
        </Link>
      </div>
    </div>
  );
}

export default Hand;
