// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState } from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import * as IoIcons from "react-icons/io";
import { question } from "../Services/Rest_call";
import "./form.css";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Topic(props) {
  const [title, settitle] = useState("");
  const [dbody, setbody] = useState("");
  const [down, setdown] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setdown(true);
    question(event.target.topic.value, event.target.dname.value)
      .then(function (response) {
        setdown(false);
        window.location.pathname = "/forum";
      })
      .catch(function (error) {
        setdown(false);
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          if (error.response.status === 500) {
            toast.error("Internal Server Error", {
              autoClose: 3000,
            });
          }
          if (error.response.status === 401) {
            localStorage.clear();
            props.update_login();
          }
          if (error.response.status === 400) {
            try {
              if (error.response.data.topic !== undefined) {
                toast.error("Topic : " + error.response.data.topic[0], {
                  autoClose: 3000,
                });
              }
            } catch {}
            try {
              if (error.response.data.description !== undefined) {
                toast.error(
                  "Description : " + error.response.data.description[0],
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
    <div className="market_content1">
      <Link to="/forum" className="btn-mobile">
        <IoIcons.IoMdArrowBack className="backarrow1" size={30} />
      </Link>

      <div id="topicformContainer">
        <form onSubmit={handleSubmit}>
          <div className="rows1">
            <div className="column1">
              <label className="theLabels1">
                <strong>Title :</strong>
              </label>
              <br />
              <br />
              <input
                className="theInputs1"
                value={title}
                onChange={(e) => settitle(e.target.value)}
                type="text"
                name="topic"
                required
              />
              <br />
              <br />
              <br />
              <label className="theLabels1">
                <strong>Description :</strong>
              </label>
              <br />
              <br />
              <textarea
                className="textbox"
                name="dname"
                id="dname"
                rows="10"
                cols="171"
                wrap="soft"
                onChange={(e) => setbody(e.target.value)}
                value={dbody}
              ></textarea>
              <br />
            </div>
            <br />
            <Button type="submit" buttonStyle="btn--primary1">
              Post Your Topic
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
            <br /> <br /> <br />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Topic;
