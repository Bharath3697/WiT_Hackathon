// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import Card from "react-bootstrap/Card";
import "./products.css";
import { get_item } from "../Services/Rest_call";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Sell(props) {
  const [resp_data, setdata] = useState("");

  useEffect(() => {
    get_item()
      .then((response) => {
        const filtered_op = response.data.filter((item) => {
          if (item.op_type === "P") {
            return item;
          }
          return 0;
        });
        setdata(filtered_op);
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
        <div className="product_list">
          {resp_data.length > 0 ? (
            <span className="pro_info">Products requested</span>
          ) : (
            <span className="pro_info"></span>
          )}
          <Link to="/sell/form" className="btn-mobile">
            <Button id="new" buttonStyle="btn--secondary">
              Sell Product
            </Button>
          </Link>
        </div>

        {resp_data.length > 0
          ? resp_data.map((item) => (
              <div className="card-rows" key={item.id}>
                <Link
                  className="title"
                  to={{ pathname: "/product/" + item.id }}
                >
                  <Card className="card1">
                    <Card.Body>
                      <Card.Title>
                        <b>Product : </b>
                        {item.item_name}
                      </Card.Title>
                      <Card.Subtitle>
                        <b>Quantity : </b>
                        {item.quantity} {item.metric}
                      </Card.Subtitle>
                      <Card.Subtitle>
                        <b>Location : </b>
                        {item.location}
                      </Card.Subtitle>
                    </Card.Body>
                  </Card>
                </Link>
              </div>
            ))
          : null}
      </div>
    </>
  );
}

export default Sell;
