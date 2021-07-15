// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { trade } from "../Services/Rest_call";
import "./form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Spinner } from "react-bootstrap";
toast.configure();

function Form(props) {
  const [item_name, setitem_name] = useState("");
  const [Location, setLocation] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [Amount, setAmount] = useState("");
  const [metric, setMetric] = useState("");
  const [down, setdown] = useState(false);

  const handleSubmit = (event) => {
    const self = props;
    event.preventDefault();
    setdown(true);
    trade(
      event.target.ItemName.value,
      event.target.Location.value,
      event.target.Quantity.value,
      event.target.Amount.value,
      metric,
      "S"
    )
      .then(function (response) {
        setdown(false);
        window.location.pathname = "/buy";
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
              if (error.response.data.item_name !== undefined) {
                toast.error("Item Name : " + error.response.data.item_name[0], {
                  autoClose: 3000,
                });
              }
            } catch {}
            try {
              if (error.response.data.location !== undefined) {
                toast.error("Location : " + error.response.data.location[0], {
                  autoClose: 3000,
                });
              }
            } catch {}
          }
        }
      });
  };

  return (
    <div className="market_content">
      <Link to="/sell" className="btn-mobile">
        <IoIcons.IoMdArrowBack className="backarrow" size={30} />
      </Link>
      <br />
      <h5 className="info_head">Sell Product : </h5>

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
            <div className="column">
              <label className="theLabels">Quantity :</label>
              <input
                className="theInputs"
                value={Quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="Quantity"
                type="number"
                name="Quantity"
                required
              />
            </div>

            <label className="label_label">Kilogram</label>
            <input
              className="radio_buttons"
              name={"select-radio"}
              value="Kg"
              type="radio"
              required
              onClick={(e) => setMetric(e.target.value)}
            ></input>
            <label className="label_label">Quintal</label>
            <input
              className="radio_buttons"
              name={"select-radio"}
              value="Q"
              type="radio"
              required
              onClick={(e) => setMetric(e.target.value)}
            ></input>
            <label className="label_label">Metric Ton</label>
            <input
              className="radio_buttons"
              name={"select-radio"}
              value="T"
              type="radio"
              required
              onClick={(e) => setMetric(e.target.value)}
            ></input>
            <div className="column">
              <label className="theLabels">Amount :</label>
              <input
                className="theInputs"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
                type="number"
                name="Amount"
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
export default Form;
