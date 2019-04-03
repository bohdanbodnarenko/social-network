import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Shape from "./Shape";

class TopShape extends Component {
  state = { path: "polygon(100% 0, 100% 15%, 0 52%, 0 29%, 0 0)" };
  getClipPath = locationPath => {
    switch (locationPath) {
      case "users":
        return "polygon(37% 30%, 100% 24%, 49% 54%, 14% 73%, 0 0)";
      case "feed":
        return "polygon(70% 0, 99% 51%, 53% 34%, 0 56%, 24% 15%)";
      case "messages":
        return "polygon(100% 14%, 100% 63%, 75% 34%, 0 31%, 19% 0)";
      case "user":
        return "polygon(53% 13%, 68% 30%, 100% 59%, 0 21%, 37% 0)";
      default:
        return "polygon(100% 0, 100% 11%, 0 65%, 0 33%, 0 0)";
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
        <Shape bg="#faa916" transition="0.75" path={path} />
        <Shape bg="#03a9f4" transition="0.8" path={path} />
      </div>
    );
  }
}

export default withRouter(TopShape);
