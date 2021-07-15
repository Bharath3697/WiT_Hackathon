// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { eachdonation, deletedonation } from "../Services/Rest_call";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import "./form.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

class Donationdetail extends React.Component {
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

    deletedonation(product_id)
      .then(function (response) {
        window.location.pathname = "/help";
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
    const donID = this.props.match.params.donID;
    const self = this.props;
    eachdonation(donID)
      .then((res) => {
        this.setState({
          resp_data: res.data,
          user_data: res.data.donation_user,
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
        <Link to="/help" className="item_launch">
          <IoIcons.IoMdArrowBack className="backarrow2" size={30} />
        </Link>

        <div className="product_details">
          <h2 className="user_msg">Donation Details :</h2>

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
            <b>Product Name : </b> {resp_data.donation_item_name}
          </p>

          <p className="prod_name">
            <b>Location : </b> {resp_data.donation_location}
          </p>
          <p className="prod_name">
            <b>Posted By : </b> {user_data.username}
          </p>
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
export default Donationdetail;
