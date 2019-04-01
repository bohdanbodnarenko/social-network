import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import UserPage from "./pages/UserPage/UserPage";
const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/user/:userId" exact component={UserPage} />
      </Switch>
    </div>
  );
};

export default MainRouter;
