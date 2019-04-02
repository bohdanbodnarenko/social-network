import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import UserPage from "./pages/UserPage/UserPage";
import Users from "./pages/Users/Users";
import Messages from "./pages/Messages/Messages";
import Feed from "./pages/Feed/Feed";
const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/users" exact component={Users} />
        <Route path="/messages" exact component={Messages} />
        <Route path="/feed" exact component={Feed} />
        <Route path="/user/:userId" exact component={UserPage} />
      </Switch>
    </div>
  );
};

export default MainRouter;
