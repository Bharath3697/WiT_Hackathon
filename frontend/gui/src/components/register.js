// Author - bharath k (bharatk7@in.ibm.com)
import React, { useState } from "react";
import { Button } from "./Button";
import { register } from "../Services/Rest_call";
import "./account.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

function Register() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [country, setcountry] = useState("");
  const [phone, setphone] = useState("");
  const [email, setemail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    let phone_no = "+" + event.target.country.value + event.target.phone.value;

    register(
      event.target.username.value,
      event.target.email.value,
      event.target.password.value,
      phone_no
    )
      .then(function (response) {
        window.location.pathname = "/login";
      })
      .catch(function (error) {
        if (!error.response) {
          alert("Connection to host failed");
        } else {
          try {
            if (error.response.data.username !== undefined) {
              toast.error("Username : " + error.response.data.username[0], {
                autoClose: 3000,
              });
            }
          } catch {}
          try {
            if (error.response.data.email !== undefined) {
              toast.error("Email : " + error.response.data.email[0], {
                autoClose: 3000,
              });
            }
          } catch {}
          try {
            if (error.response.data.password !== undefined) {
              toast.error("Password : " + error.response.data.password[0], {
                autoClose: 3000,
              });
            }
          } catch {}
          try {
            if (error.response.data.phone_number !== undefined) {
              toast.error(error.response.data.phone_number[0], {
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
            <b className="logc">Register</b>
          </span>
          <div className="rows">
            <div className="column">
              <input
                className="accInputs"
                value={username}
                onChange={(e) => setusername(e.target.value)}
                placeholder="Username"
                type="text"
                name="username"
                required
              />
            </div>
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

            <div className="column">
              <input
                className="accInputs"
                value={country}
                onChange={(e) => setcountry(e.target.value)}
                placeholder="country code (+91)"
                type="number"
                name="country"
                required
              />
            </div>
            <div className="column">
              <input
                className="accInputs"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
                placeholder="Phone number"
                type="number"
                name="phone"
                required
              />
            </div>
            <Button type="submit" buttonStyle="btn--login1">
              Register
            </Button>
          </div>
          <span className="quest">
            Already registered ?
            <a className="regs" href="/login">
              Login
            </a>
          </span>
          <br /> <br />
        </form>
      </div>
    </div>
  );
}
export default Register;
