// Author - bharath k (bharatk7@in.ibm.com)
import { React, useState, useEffect } from "react";
import { Route, useRouteMatch, Redirect } from "react-router-dom";
import Shop from "./components/shop";
import Home from "./components/home";
import Sell from "./components/sell";
import Buy from "./components/buy";
import Form from "./components/sell_form";
import BuyForm from "./components/buy_form";
import Forum from "./components/forum";
import Topic from "./components/topic_form";
import Title from "./components/title";
import Sidebar from "./components/sidebar";
import ItemLanch from "./components/item_launch";
import Recommend from "./components/recommend";
import { logout } from "./Services/Rest_call";
import Agri from "./components/agri";
import Help from "./components/help_form";
import Donate from "./components/donate";
import Donationdetail from "./components/donation_details";
import Account from "./components/account";
import Others from "./components/others";
import Weather from "./components/weather";
import Wallet from "./components/wallet";
import Job from "./components/job";
import Jobform from "./components/job_form";
import Hand from "./components/helpinghand";
import Jobdetails from "./components/job_details";
function BaseRouter() {
  const [logged, setlogged] = useState(false);
  const [error_msg, seterror] = useState("You are not logged in");

  const logoutMatch = useRouteMatch("/logout");
  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (logoutMatch) {
      if (token !== null) {
        logout()
          .then(function (response) {
            if (response.status === 200) {
              localStorage.clear();
              window.location.pathname = "/login";
            }
          })
          .catch(function (error) {
            if (!error.response) {
              seterror("Connection to host failed");
            } else {
              localStorage.clear();
              seterror("Invalid Token");
              window.location.pathname = "/login";
            }
          });
      }
    }
  }, [logoutMatch]);
  const update_loggedin_state = () => {
    setlogged(false);
    seterror("Token Expired / Invalid Token");
  };

  if (!logged) {
    const local_token = localStorage.getItem("Token");
    if (local_token != null) {
      setlogged(true);
    } else {
      return (
        <div className="auth_error">
          {error_msg}{" "}
          <a href="/login">
            <u>Login</u>
          </a>
        </div>
      );
    }
  }

  return (
    <>
      <Sidebar />

      <Route
        exact
        path="/"
        render={() => {
          return <Redirect to="/home" />;
        }}
      />
      <div className="content_box">
        <Route
          path="/home"
          exact
          render={(props) => (
            <Home {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/shop"
          exact
          render={(props) => (
            <Shop {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/sell"
          exact
          render={(props) => (
            <Sell {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/weather"
          exact
          render={(props) => (
            <Weather {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/buy"
          exact
          render={(props) => (
            <Buy {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route path="/others" exact component={Others} />
        <Route
          path="/help"
          exact
          render={(props) => (
            <Donate {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/resource"
          exact
          render={(props) => (
            <Job {...props} update_login={update_loggedin_state} />
          )}
        />

        <Route
          path="/donate/form"
          exact
          render={(props) => (
            <Help {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/resource/form"
          exact
          render={(props) => (
            <Jobform {...props} update_login={update_loggedin_state} />
          )}
        />

        <Route
          path="/sell/form"
          exact
          render={(props) => (
            <Form {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/buy/form"
          exact
          render={(props) => (
            <BuyForm {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/forum"
          exact
          render={(props) => (
            <Forum {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/forum/form"
          exact
          render={(props) => (
            <Topic {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/title/:topicID"
          exact
          render={(props) => (
            <Title {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/opportunity/:jobID"
          exact
          render={(props) => (
            <Jobdetails {...props} update_login={update_loggedin_state} />
          )}
        />

        <Route
          path="/help/:donID"
          exact
          render={(props) => (
            <Donationdetail {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/product/:prodID"
          exact
          render={(props) => (
            <ItemLanch {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/recommend"
          exact
          render={(props) => (
            <Recommend {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/helpinghand"
          exact
          render={(props) => (
            <Hand {...props} update_login={update_loggedin_state} />
          )}
        />

        <Route
          path="/agri"
          exact
          render={(props) => (
            <Agri {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/account"
          exact
          render={(props) => (
            <Account {...props} update_login={update_loggedin_state} />
          )}
        />
        <Route
          path="/wallet"
          exact
          render={(props) => (
            <Wallet {...props} update_login={update_loggedin_state} />
          )}
        />
      </div>
    </>
  );
}

export default BaseRouter;
