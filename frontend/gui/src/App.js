import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import BaseRouter from "./Routes";
import Login from "./components/login";
import Register from "./components/register";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <>
            <BaseRouter />
          </>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
