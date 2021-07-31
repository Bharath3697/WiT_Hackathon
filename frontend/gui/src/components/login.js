// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState } from "react";
import { Button } from "./Button";
import { login } from "../Services/Rest_call";
import "./account.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Login() {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    login(event.target.email.value, event.target.password.value)
      .then(function (response) {
        localStorage.setItem("Token", response.data.Token);
        localStorage.setItem("User", response.data.user);
        window.location.pathname = "/home";
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          try {
            if (error.response.data.non_field_errors !== undefined) {
              toast.error(error.response.data.non_field_errors[0], {
                autoClose: 3000,
              });
            }
          } catch {}
        }
        if (error.response.status === 500) {
          toast.error("Internal Server Error", {
            autoClose: 3000,
          });
        }
      });
  };

  return (
    <div className="acc_container">
      <div id="accformContainer" onSubmit={handleSubmit}>
        <form id="accformC">
          <span className="acc_head">
            <b className="logc">Login</b>
          </span>
          <div className="rows">
            <div className="column">
              <input
                className="accInputs"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Email"
                type="text"
                name="email"
                required
              />
            </div>
            <div className="column">
              <input
                className="accInputs"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
                required
              />
            </div>

            <Button type="submit" buttonStyle="btn--login">
              Login
            </Button>
          </div>
          <span className="quest">
            Not registered yet?
            <a className="regs" href="/register">
              Register
            </a>
          </span>
          <br /> <br />
        </form>
      </div>
    </div>
  );
}
export default Login;
