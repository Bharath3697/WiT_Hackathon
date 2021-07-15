// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import "./navbar.css";

function Navbar() {
  let user = localStorage.getItem("User");
  return (
    <>
      <nav>
        <nav id="navbar" className="navbar navbar--fixed-top">
          <div className="title">
            <div className="page_title">
              <Link to="/home" className="navbar-logo">
                <IoIcons.IoIosHome className="backarrow" size={30} />
                <span className="logo">GreenHouse</span>
              </Link>
            </div>
            <span className="user">Logged in as : {user}</span>
          </div>
        </nav>
      </nav>
    </>
  );
}

export default Navbar;
