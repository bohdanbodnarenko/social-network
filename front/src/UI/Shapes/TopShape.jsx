import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Shape from "./Shape";
import { colors } from "../../theme";

class TopShape extends Component {
  state = { path: "polygon(100% 0, 100% 15%, 0 52%, 0 29%, 0 0)" };
  getClipPath = locationPath => {
    switch (locationPath) {
      case "users":
        return "polygon(26% 5%, 58% 19%, 100% 10%, 100% 24%, 60% 32%, 24% 27%, 0 40%, 0 11%)";
      case "feed":
        return "polygon(26% 5%, 57% 6%, 100% 24%, 100% 43%, 69% 22%, 32% 16%, 0 28%, 0 11%)";
      case "messages":
        return "polygon(34% 8%, 63% 20%, 100% 0, 100% 28%, 63% 41%, 30% 25%, 0 28%, 0 11%);";
      case "user":
        return "polygon(26% 21%, 61% 18%, 100% 28%, 100% 46%, 63% 41%, 24% 49%, 0 40%, 0 11%)";
      case "":
        return "polygon(0 0)";
      default:
        return "polygon(28% 0, 57% 6%, 100% 0, 100% 21%, 65% 24%, 32% 33%, 0 28%, 0 11%);";
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.setState({
        path: this.getClipPath(this.props.location.pathname.split("/")[1])
      });
    }
  }
  componentDidMount() {
    this.setState({
      path: this.getClipPath(this.props.location.pathname.split("/")[1])
    });
  }
  render() {
    const { path } = this.state;
    return (
      <div>
        <Shape bg={colors.middleViolet} transition="0.75" path={path} />
        <Shape bg={colors.lightViolet} transition="0.8" path={path} />
      </div>
    );
  }
}

export default withRouter(TopShape);
