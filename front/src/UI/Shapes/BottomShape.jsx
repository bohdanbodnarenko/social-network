import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Shape from "./Shape";
import { colors } from "../../theme";

class TopShape extends Component {
  state = { path: "polygon(100% 0, 100% 15%, 0 52%, 0 29%, 0 0)" };
  getClipPath = locationPath => {
    switch (locationPath) {
      case "users":
        return "polygon(38% 88%, 72% 69%, 100% 80%, 100% 100%, 79% 86%, 52% 100%, 0 100%, 0 94%);";
      case "feed":
        return "polygon(14% 87%, 43% 81%, 99% 70%, 100% 100%, 94% 93%, 26% 100%, 0 100%, 2% 75%);";
      case "messages":
        return "polygon(31% 62%, 56% 82%, 100% 77%, 100% 100%, 56% 94%, 29% 80%, 0 100%, 0 78%);";
      case "user":
        return "polygon(26% 74%, 48% 88%, 100% 80%, 100% 100%, 52% 100%, 26% 91%, 0 100%, 0 84%);";
      case "":
        return "polygon(0 0)";
      default:
        return "polygon(29% 84%, 62% 71%, 100% 84%, 100% 100%, 66% 92%, 32% 97%, 0 100%, 0 84%);";
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
        <Shape bg={colors.middlePurple} transition="0.75" path={path} />
        <Shape bg={colors.lightPurple} transition="0.8" path={path} />
      </div>
    );
  }
}

export default withRouter(TopShape);
