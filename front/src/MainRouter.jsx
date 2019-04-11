import React from "react";
import { Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import UserPage from "./pages/UserPage/UserPage";
import Users from "./pages/Users/Users";
import Messages from "./pages/Messages/Messages";
import Feed from "./pages/Feed/Feed";
import PostPage from "./pages/PostPage/PostPage";
import MessagePage from "./pages/MessagePage/MessagePage";
const MainRouter = () => {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/users" exact component={Users} />
        <Route path="/messages" exact component={Messages} />
        <Route path="/feed" exact component={Feed} />
        <Route path="/user/:userId" exact component={UserPage} />
        <Route path="/post/:postId" exact component={PostPage} />
        <Route path="/messages/:channelId" exact component={MessagePage} />
      </Switch>
    </div>
  );
};

export default MainRouter;
