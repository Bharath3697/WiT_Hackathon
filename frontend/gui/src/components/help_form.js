// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { donate } from "../Services/Rest_call";
import "./form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
toast.configure();

function Help(props) {
  const [item_name, setitem_name] = useState("");
  const [Location, setLocation] = useState("");
  const [down, setdown] = useState(false);

  const handleSubmit = (event) => {
    const self = props;
    setdown(true);
    event.preventDefault();
    donate(event.target.ItemName.value, event.target.Location.value)
      .then(function (response) {
        setdown(false);
        window.location.pathname = "/help";
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
              if (error.response.data.donation_item_name !== undefined) {
                toast.error(
                  "Item Name : " + error.response.data.donation_item_name[0],
                  {
                    autoClose: 3000,
                  }
                );
              }
            } catch {}
            try {
              if (error.response.data.donation_location !== undefined) {
                toast.error(
                  "Location : " + error.response.data.donation_location[0],
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
      <h1 className="help_title">Make a difference</h1>
      <div id="formContainer" onSubmit={handleSubmit}>
        <form id="formC">
          <div className="rows">
            <div className="column">
              <label className="theLabels">Item Name :</label>
              <input
                className="theInputs"
                value={item_name}
                onChange={(e) => setitem_name(e.target.value)}
                placeholder="ItemName"
                type="text"
                name="ItemName"
                required
              />
            </div>
            <div className="column">
              <label className="theLabels">Location :</label>
              <input
                className="theInputs"
                value={Location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                type="text"
                name="Location"
                required
              />
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
export default Help;
