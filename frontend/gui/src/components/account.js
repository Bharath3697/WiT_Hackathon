// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import "./account.css";

function Account(props) {
  return (
    <div className="testing">
      <a className="hrside1" href="/wallet">
        Wallet
      </a>
      <a className="hrside1" href="/logout">
        Logout
      </a>
    </div>
  );
}

export default Account;
