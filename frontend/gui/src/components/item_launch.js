// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { eachitem, deleteitem } from "../Services/Rest_call";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import "./form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class ItemLanch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resp_data: "",
      user_data: "",
    };

    this.handledelete = this.handledelete.bind(this);
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }
  handledelete(event) {
    const product_id = document
      .getElementById("del_topic")
      .getAttribute("value");
    const self = this.props;

    deleteitem(product_id)
      .then(function (response) {
        window.location.pathname = "/shop";
      })
      .catch(function (error) {
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
          if (error.response.status === 404) {
            toast.error("Details Not Found", {
              autoClose: 3000,
            });
          }
        }
      });
  }

  componentDidMount() {
    const prodID = this.props.match.params.prodID;
    const self = this.props;
    eachitem(prodID)
      .then((res) => {
        this.setState({
          resp_data: res.data,
          user_data: res.data.user,
        });
      })
      .catch((error) => {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            self.update_login();
          }
          if (error.response.status === 404) {
            toast.error("Details Not Found", {
              autoClose: 3000,
            });
          }
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          }
        }
      });
  }
  render() {
    const resp_data = this.state.resp_data;
    const user_data = this.state.user_data;

    let cur_user = localStorage.getItem("User");

    return (
      <div className="contain">
        {resp_data.op_type === "P" && (
          <Link to="/sell" className="item_launch">
            <IoIcons.IoMdArrowBack className="backarrow2" size={30} />
          </Link>
        )}
        {resp_data.op_type === "S" && (
          <Link to="/buy" className="item_launch">
            <IoIcons.IoMdArrowBack className="backarrow2" size={30} />
          </Link>
        )}
        <div className="product_details">
          {resp_data.op_type === "P" && (
            <h2 className="user_msg">Request Details :</h2>
          )}
          {resp_data.op_type === "S" && (
            <h2 className="user_msg">Sale Details :</h2>
          )}

          {cur_user === user_data.username && (
            <span onClick={this.handledelete}>
              <RiIcons.RiDeleteBin3Fill
                value={resp_data.id}
                name="del_topic"
                id="del_topic"
                className="backarrowx"
                size={30}
              />
            </span>
          )}
          <hr />
          <p className="prod_name">
            <b>Product Name : </b> {resp_data.item_name}
          </p>
          <p className="prod_name">
            <b>Quantity : </b> {resp_data.quantity}{" "}
            {resp_data.metric === "Kg" && "Kilogram"}
            {resp_data.metric === "Q" && "Quintal"}
            {resp_data.metric === "T" && "Metric Ton"}
          </p>
          {resp_data.op_type === "S" && (
            <p className="prod_name">
              <b>Selling Price : </b> {resp_data.amount}
            </p>
          )}
          <p className="prod_name">
            <b>Location : </b> {resp_data.location}
          </p>
          {resp_data.op_type === "P" && (
            <p className="prod_name">
              <b>Requested By : </b> {user_data.username}
            </p>
          )}
          {resp_data.op_type === "S" && (
            <p className="prod_name">
              <b>Sold By : </b> {user_data.username}
            </p>
          )}
          <p className="prod_name">
            <b>Contact No : </b> {user_data.phone_number}
          </p>
          <p className="prod_name">
            <b>Email : </b> {user_data.email}
          </p>
        </div>
      </div>
    );
  }
}
export default ItemLanch;
