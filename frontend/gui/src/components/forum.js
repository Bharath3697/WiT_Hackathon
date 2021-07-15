// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import "./form.css";
import { get_topics } from "../Services/Rest_call";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Forum(props) {
  const [resp_data, setdata] = useState("");

  useEffect(() => {
    get_topics()
      .then((response) => {
        setdata(response.data);
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            props.update_login();
          }
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          }
        }
      })
      .then(function () {});
  }, [props]);

  return (
    <>
      <div className="Trade_button1">
        <h4 className="topic">Hot Topics ({resp_data.length})</h4>
        <div className="ask_qstn">
          <Link to="/forum/form" className="btn-mobile">
            <Button id="new" buttonStyle="btn--primary">
              Ask Question
            </Button>
          </Link>
        </div>
        <hr className="hr-line1" />
      </div>

      <div className="product_list">
        <ul className="topics">
          {resp_data.length > 0
            ? resp_data.map((item) => (
                <Link
                  className="titlex"
                  key={item.id}
                  to={{ pathname: "/title/" + item.id }}
                >
                  <li>{item.topic} </li>
                </Link>
              ))
            : null}
        </ul>
      </div>
    </>
  );
}

export default Forum;
