// Author - bharath k (bharatk7@in.ibm.com)
import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  eachtopic,
  comment,
  deletetopic,
  deletecomment,
} from "../Services/Rest_call";
import "./form.css";

toast.configure();
class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resp_data: "",
      discussion: "",
      textAreaValue: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handledelete = this.handledelete.bind(this);
    this.handledeletecom = this.handledeletecom.bind(this);
  }

  handleChange(event) {
    this.setState({ textAreaValue: event.target.value });
  }
  handledelete(event) {
    const top_id = document.getElementById("del_topic").getAttribute("value");
    const self = this.props;
    deletetopic(top_id)
      .then(function (response) {
        window.location.pathname = "/forum";
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            self.update_login();
          }
          if (error.response.status === 400) {
            toast.error("Topic does not exists", {
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
  handledeletecom(event) {
    const com_id = event.target.getAttribute("value");
    const self = this.props;
    deletecomment(com_id)
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            self.update_login();
          }
          if (error.response.status === 400) {
            toast.error("Topic does not exists", {
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
  handleSubmit(event) {
    const self = this.props;
    event.preventDefault();

    comment(this.props.match.params.topicID, event.target.taname.value)
      .then(function (response) {
        window.location.reload();
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 401) {
            localStorage.clear();
            self.update_login();
          }
          if (error.response.status === 400) {
            toast.error("Topic does not exists", {
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
  componentDidMount() {
    const topicID = this.props.match.params.topicID;
    const self = this.props;
    eachtopic(topicID)
      .then((res) => {
        this.setState({
          resp_data: res.data,
          discussion: res.data.discussion,
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
    const discussion = this.state.discussion;

    let arr;
    let arr1;
    let cur_user = localStorage.getItem("User");
    if (discussion.length !== 0) {
      arr1 = discussion.map((discuss) => (
        <div className="comment_disc" key={discuss.id}>
          <span>{discuss.comment}</span>
          {cur_user === discuss.comment_username && (
            <span>
              <RiIcons.RiDeleteBin3Line
                onClick={this.handledeletecom}
                className="backarrowc"
                value={discuss.id}
                size={21}
              />
            </span>
          )}
          <div className="topbox">
            <span className="asked_by1">{discuss.comment_username}</span>
            <br />
            <span className="asked_on">{discuss.date_created} </span>
          </div>

          <hr className="topic_line" />
        </div>
      ));
    } else {
      arr1 = (
        <div>
          No comments yet
          <br />
          <br />
        </div>
      );
    }

    if (resp_data !== "") {
      arr = (
        <>
          <div className="topic_disc">
            <h5>{resp_data.topic}</h5>
            {cur_user === resp_data.topic_user.username && (
              <span onClick={this.handledelete}>
                <RiIcons.RiDeleteBin3Fill
                  value={resp_data.id}
                  name="del_topic"
                  id="del_topic"
                  className="backarrowd"
                  size={25}
                />
              </span>
            )}

            <div className="topbox">
              <span className="asked_by">
                Asked : {resp_data.topic_user.username}
              </span>
              <span className="asked_on">{resp_data.date_created} </span>
            </div>
            <hr className="topic_line" />
            <span className="creator_desc">
              Description : {resp_data.description}{" "}
            </span>
          </div>
        </>
      );
    }
    return (
      <div className="contain">
        <Link to="/forum" className="btn-mobile">
          <IoIcons.IoMdArrowBack className="backarrow2" size={30} />
        </Link>
        {arr}
        <br />
        <h6 className="com_haed">Comments : </h6>
        {arr1}
        <div className="comment_section">
          <span>
            <b>Your Comment : </b>
          </span>
          <br />
          <br />
          <form onSubmit={this.handleSubmit}>
            <textarea
              className="textboxb"
              name="taname"
              id="taname"
              rows="10"
              cols="171"
              wrap="soft"
              value={this.state.textAreaValue}
              onChange={this.handleChange}
              required={true}
            ></textarea>
            <Button type="submit" buttonStyle="btn--primary2">
              Post Your Comment
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
export default Title;
