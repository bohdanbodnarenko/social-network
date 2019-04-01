import React, { Component } from "react";
import { getUserById } from "../../utils/requests";
import Spinner from "../../UI/Spinner/Spinner";
import * as Styles from "./styles";
import moment from "moment";
import { connect } from "react-redux";
import * as Icons from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
export class UserPage extends Component {
  state = {
    user: null
  };
  componentDidMount = async () => {
    const user = await getUserById(this.props.match.params.userId);
    this.setState({ user });
  };

  render() {
    const { user } = this.state;
    const { currentUser } = this.props;
    if (currentUser && user) {
      console.log(currentUser._id === user._id);
    }
    if (!user) {
      return <Spinner />;
    }
    const renderControllMenu = (
      <Styles.ControllMenu>
        <IconButton color="secondary">
          <Icons.EditRounded />
        </IconButton>
        <IconButton color="error">
          <Icons.DeleteRounded />
        </IconButton>
      </Styles.ControllMenu>
    );
    return (
      <Styles.Wrapper>
        <Styles.TopWrapper />
        <Styles.ContentWrapper>
          <Styles.Image
            src={user.photo || "https://www.gravatar.com/avatar?d=mp&s=200"}
            alt={user.name}
          />
          {currentUser._id === user._id && renderControllMenu}
          <Styles.Text>{user.name}</Styles.Text>
          <Styles.Text>{user.email}</Styles.Text>
          <Styles.SmallText>
            With us from {moment().format("LLL")}
          </Styles.SmallText>
        </Styles.ContentWrapper>
      </Styles.Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(UserPage);
