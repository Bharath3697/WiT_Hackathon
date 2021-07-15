// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import "./general.css";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
function Others(props) {
  return (
    <div className="arrow">
      <Link to="/recommend" className="btn-mobile">
        <IoIcons.IoMdArrowBack className="backarrow" size={30} />
      </Link>
      <div className="others1">
        <span>More options will be added soon</span>
      </div>
    </div>
  );
}

export default Others;
