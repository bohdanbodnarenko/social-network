import React, { Component } from "react";
import {
  getUserById,
  confirmPassword,
  deleteAccount,
  updateAccount,
  getLinkToUserAvatar,
  followToUser,
  unfollowFromUser
} from "../../utils/requests";
import Spinner from "../../UI/Spinner/Spinner";
import * as Styles from "./styles";
import moment from "moment";
import { connect } from "react-redux";
import * as Icons from "@material-ui/icons";
import { IconButton, Avatar, Button } from "@material-ui/core";
import DeletePopup from "./DeletePopup";
import { logout } from "../../store/auth/actions";
import UpdatePopup from "./UpdatePopup";
export class UserPage extends Component {
  state = {
    user: null,
    deletePopup: false,
    updatePopup: false,
    loading: false,
    passwordError: "",
    following: false
  };

  handleClick = name => () => {
    this.setState({ [name]: !this.state[name], passwordError: "" });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      const user = await getUserById(this.props.match.params.userId);
      this.setState({ user });
    }
  };

  submitDelete = (password, user) => async event => {
    event.preventDefault();
    if (!password) {
      return this.setState({ passwordError: "Field should be filled" });
    }
    this.setState({ loading: true });
    const { correct } = await confirmPassword(password);
    if (correct) {
      const res = await deleteAccount(this.state.user._id);
      if (res) {
        console.log(res);
        this.setState({ deletePopup: false, loading: false });
      }
      this.setState({ loading: false });
    } else {
      this.setState({
        passwordError: "Password is not correct!",
        loading: false
      });
    }
  };

  checkIsFollow = user => {
    console.log(user.followers);
    if (!user.followers || user.followers.length < 1) {
      return false;
    }
    return user.followers.some(
      follower => follower._id === this.props.currentUser._id
    );
  };

  submitUpdate = (password, user) => async event => {
    event.preventDefault();
    let fd = new FormData();
    // for (let value of Object.entries(user)) {
    //   fd.append(value[0], value[1]);
    // }
    fd.append("photo", user.photo);
    fd.append("name", user.name);
    fd.append("email", user.email);
    if (!password) {
      return this.setState({ passwordError: "Field should be filled" });
    }
    if (!user || !user.name || !user.name) {
      return this.setState({ passwordError: "Fields can't be empty!" });
    }
    this.setState({ loading: true });
    const { correct } = await confirmPassword(password);
    if (correct) {
      const res = await updateAccount(this.state.user._id, fd);
      if (res) {
        this.setState({
          updatePopup: false,
          loading: false,
          user: { name: user.name, email: user.email }
        });
      }
      this.setState({ loading: false });
    } else {
      this.setState({
        passwordError: "Password is not correct!",
        loading: false
      });
    }
  };

  componentDidMount = async () => {
    this.setState({ loading: true });
    const user = await getUserById(this.props.match.params.userId);
    console.log(user);
    this.setState({
      user,
      loading: false,
      following: this.checkIsFollow(user)
    });
  };

  handleFollowClick = async () => {
    if (this.state.following) {
      this.setState({ loading: true });
      const res = await unfollowFromUser(
        this.state.user._id,
        this.props.currentUser._id
      );
      if (res) {
        this.setState({ loading: false, following: false });
      }
    } else {
      this.setState({ loading: true });
      const res = await followToUser(
        this.state.user._id,
        this.props.currentUser._id
      );
      if (res) {
        this.setState({ loading: false, following: true });
      }
    }
  };

  render() {
    const {
      user,
      deletePopup,
      updatePopup,
      loading,
      passwordError,
      following
    } = this.state;
    const { currentUser } = this.props;
    if (!user) {
      return <Spinner />;
    }
    const renderControllMenu = (
      <Styles.ControllMenu>
        <IconButton onClick={this.handleClick("updatePopup")} color="secondary">
          <Icons.EditRounded />
        </IconButton>
        <IconButton onClick={this.handleClick("deletePopup")} color="default">
          <Icons.DeleteRounded />
        </IconButton>
      </Styles.ControllMenu>
    );
    return (
      <div>
        <DeletePopup
          loading={loading}
          error={passwordError}
          submit={this.submitDelete}
          close={this.handleClick("deletePopup")}
          open={deletePopup}
          user={user}
        />
        <UpdatePopup
          imageSrc={
            user.photo
              ? getLinkToUserAvatar(user._id)
              : "https://www.gravatar.com/avatar?d=mp&s=200"
          }
          loading={loading}
          error={passwordError}
          submit={this.submitUpdate}
          close={this.handleClick("updatePopup")}
          open={updatePopup}
          user={user}
        />
        <Styles.ContentWrapper>
          <Avatar
            style={{ width: "150px", height: "150px" }}
            src={
              user.photo
                ? getLinkToUserAvatar(user._id)
                : "https://www.gravatar.com/avatar?d=mp&s=200"
            }
            alt={user.name}
          />
          {currentUser._id === user._id && renderControllMenu}
          <Styles.Text>{user.name}</Styles.Text>
          <Styles.Text>{user.email}</Styles.Text>
          <Styles.SmallText>
            With us from {moment(user.created).format("LLL")}
          </Styles.SmallText>
          {currentUser._id !== user._id && (
            <Styles.ButtonsWrapper>
              <Button
                style={{
                  backgroundColor: following ? "#C1292E" : "#5FAD56",
                  border: "none"
                }}
                onClick={this.handleFollowClick}
                variant="outlined"
              >
                <span className="whiteText">
                  {following ? "Unfollow" : "Follow"}
                </span>
              </Button>
              <Button color="secondary" variant="text">
                Followers
              </Button>
            </Styles.ButtonsWrapper>
          )}
        </Styles.ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
