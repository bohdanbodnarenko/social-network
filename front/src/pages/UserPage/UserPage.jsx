import React, { Component } from "react";
import { getUserById } from "../../utils/requests";

export class UserPage extends Component {
  componentDidMount = () => {
    getUserById("5c9b5b574636b42a14501f3");
  };

  render() {
    return <div>User page</div>;
  }
}

export default UserPage;
