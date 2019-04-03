import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Shape from "./Shape";

class TopShape extends Component {
  state = { path: "polygon(100% 0, 100% 15%, 0 52%, 0 29%, 0 0)" };
  getClipPath = locationPath => {
    switch (locationPath) {
      case "users":
        return "polygon(66% 93%, 100% 100%, 59% 100%, 0 100%, 55% 77%)";
      case "feed":
        return "polygon(56% 91%, 66% 100%, 0 100%, 31% 88%, 50% 75%)";
      case "messages":
        return "polygon(36% 96%, 41% 100%, 0 100%, 0 86%, 38% 79%)";
      case "user":
        return "polygon(100% 91%, 100% 100%, 27% 100%, 50% 93%, 67% 81%)";
      default:
        return "polygon(47% 91%, 66% 100%, 0 100%, 0 79%, 14% 87%)";
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
        <Shape bg="#03a9f4" transition="0.75" path={path} />
        <Shape bg="#faa916" transition="0.8" path={path} />
      </div>
    );
  }
}

export default withRouter(TopShape);
