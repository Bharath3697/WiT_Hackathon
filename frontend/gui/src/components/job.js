// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import Card from "react-bootstrap/Card";
import "./products.css";
import { get_job } from "../Services/Rest_call";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Job(props) {
  const [resp_data, setdata] = useState("");

  const display = (event) => {
    if (event === "Work") {
      document.querySelectorAll(".Work").forEach(function (el) {
        el.style.display = "block";
      });
      document.querySelectorAll(".Workforce").forEach(function (el) {
        el.style.display = "none";
      });
    } else if (event === "Workforce") {
      document.querySelectorAll(".Workforce").forEach(function (el) {
        el.style.display = "block";
      });
      document.querySelectorAll(".Work").forEach(function (el) {
        el.style.display = "none";
      });
    } else {
      document.querySelectorAll(".Workforce").forEach(function (el) {
        el.style.display = "block";
      });
      document.querySelectorAll(".Work").forEach(function (el) {
        el.style.display = "block";
      });
    }
  };
  useEffect(() => {
    get_job()
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
      <div className="Trade_button">
        {resp_data.length > 0 ? (
          <>
            <span className="pro_info">Requests</span>
            <select
              name="sector"
              className="options1"
              onChange={(e) => display(e.target.value)}
            >
              <option className="default" defaultValue>
                Filter
              </option>
              <option value="Showall">Show All</option>
              <option value="Workforce">Workforce</option>
              <option value="Work">Work</option>
            </select>
          </>
        ) : (
          <span className="pro_info"></span>
        )}
        <Link to="/resource/form" className="btn-mobile">
          <Button id="new" buttonStyle="btn--secondary">
            Request
          </Button>
        </Link>
      </div>
      <div className="product_list">
        {resp_data.length > 0
          ? resp_data.map((item) =>
              item.looking_for === "Work" ? (
                <div className="card-rows " key={item.id}>
                  <Link
                    className="title"
                    to={{ pathname: "/opportunity/" + item.id }}
                  >
                    <Card className="card Work">
                      <Card.Body>
                        <Card.Title>
                          <b>Looking for : </b>
                          {item.looking_for}
                        </Card.Title>
                        <Card.Subtitle>
                          <b>Sector : </b>
                          {item.sector}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              ) : (
                <div className="card-rows " key={item.id}>
                  <Link
                    className="title"
                    to={{ pathname: "/opportunity/" + item.id }}
                  >
                    <Card className="card Workforce">
                      <Card.Body>
                        <Card.Title>
                          <b>Looking for : </b>
                          {item.looking_for}
                        </Card.Title>
                        <Card.Subtitle>
                          <b>Sector : </b>
                          {item.sector}
                        </Card.Subtitle>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              )
            )
          : null}
      </div>
    </>
  );
}

export default Job;
