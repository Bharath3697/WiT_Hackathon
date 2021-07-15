// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { post_job } from "../Services/Rest_call";
import "./form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
toast.configure();

function Jobform(props) {
  const [look, setlook] = useState("");
  const [sector, setsector] = useState("");
  const [location, setlocation] = useState("");
  const [comment, setcomment] = useState("");
  const [down, setdown] = useState(false);

  const handleSubmit = (event) => {
    const self = props;
    setdown(true);
    event.preventDefault();
    post_job(
      event.target.look.value,
      event.target.sector.value,
      event.target.location.value,
      event.target.dname.value
    )
      .then(function (response) {
        setdown(false);
        window.location.pathname = "/resource";
      })
      .catch(function (error) {
        setdown(false);
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            self.update_login();
          }
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          }
          if (error.response.status === 400) {
            try {
              if (error.response.data.looking_for !== undefined) {
                toast.error(
                  "Looking for : " + error.response.data.looking_for[0],
                  {
                    autoClose: 3000,
                  }
                );
              }
            } catch {}
            try {
              if (error.response.data.job_location !== undefined) {
                toast.error(
                  "Location : " + error.response.data.job_location[0],
                  {
                    autoClose: 3000,
                  }
                );
              }
            } catch {}
            try {
              if (error.response.data.sector !== undefined) {
                toast.error("Sector : " + error.response.data.sector[0], {
                  autoClose: 3000,
                });
              }
            } catch {}
            try {
              if (error.response.data.res_comments !== undefined) {
                toast.error(
                  "Comment : " + error.response.data.res_comments[0],
                  {
                    autoClose: 3000,
                  }
                );
              }
            } catch {}
          }
        }
      });
  };

  return (
    <div className="market_content">
      <Link to="/help" className="btn-mobile">
        <IoIcons.IoMdArrowBack className="backarrow" size={30} />
      </Link>
      <br />
      <h1 className="help_title">
        Make someone's life better by giving an opportunity !!
      </h1>
      <div id="formContainer" onSubmit={handleSubmit}>
        <form id="formC">
          <div className="rows">
            <div className="column">
              <label className="theLabels">Looking for :</label>
              <select
                className="options"
                value={look}
                onChange={(e) => setlook(e.target.value)}
                name="look"
              >
                <option value="Workforce">Workforce</option>
                <option value="Work">Work</option>
              </select>
            </div>
            <div className="column">
              <label className="theLabels">Sector :</label>
              <select
                name="sector"
                className="options"
                value={sector}
                onChange={(e) => setsector(e.target.value)}
              >
                <option value="Agriculture">Agriculture</option>
                <option value="Farming">Farming</option>
                <option value="Cattle ranching">Cattle ranching</option>
              </select>
            </div>

            <div className="column">
              <label className="theLabels">Location :</label>
              <input
                className="theInputs"
                value={location}
                onChange={(e) => setlocation(e.target.value)}
                placeholder="Location"
                type="text"
                name="location"
                required
              />
            </div>
            <div className="column">
              <label className="theLabels">Comments :</label>
              <textarea
                className="textboxj"
                name="dname"
                id="dname"
                rows="3"
                cols="171"
                wrap="soft"
                onChange={(e) => setcomment(e.target.value)}
                value={comment}
              ></textarea>
            </div>

            <Button type="submit" buttonStyle="btn--secondary1">
              Submit
              {down && (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  style={{ marginLeft: "25px" }}
                />
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default Jobform;
