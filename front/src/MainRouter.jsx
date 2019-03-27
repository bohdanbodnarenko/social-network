import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Signup from "./components/auth/Signup";
const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/signup" exact component={Signup} />
      </Switch>
    </div>
  );
};

export default MainRouter;
