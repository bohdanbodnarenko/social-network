import React, { Component } from "react";
import {
  confirmPassword,
  deleteAccount,
  updateAccount,
  getLinkToUserAvatar,
  followToUser,
  unfollowFromUser,
  getLinkToPrivateChannel
} from "../../utils/requests";
import Spinner from "../../UI/Spinner/Spinner";
import * as Styles from "./styles";
import moment from "moment";
import { connect } from "react-redux";
import * as Icons from "@material-ui/icons";
import { IconButton, Avatar, Fab, Button } from "@material-ui/core";
import DeletePopup from "./DeletePopup";
import { logout } from "../../store/auth/actions";
import UpdatePopup from "./UpdatePopup";
import UserDataTabs from "./UserDataTabs";
import NewPostModal from "../../components/NewPostModal/NewPostModal";
import { getUserById } from "../../store/users/actions";
import { getPostsByUserId } from "../../store/posts/actions";
export class UserPage extends Component {
  state = {
    user: this.props.user,
    deletePopup: false,
    updatePopup: false,
    loading: true,
    passwordError: "",
    posts: null,
    newPostModal: false,
    following: false
  };

  handleClick = name => () => {
    this.setState({ [name]: !this.state[name], passwordError: "" });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.match.params.userId !== this.props.match.params.userId) {
      this.setState({ loading: true });
      this.props.getUser(this.props.match.params.userId);
      this.props.getPosts(this.props.match.params.userId);
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.user && nextProps.user !== this.props.user) {
      this.setState({
        loading: false,
        user: nextProps.user,
        following: this.checkIsFollow(nextProps.user)
      });
    }
    if (nextProps.posts && nextProps.posts !== this.props.posts) {
      this.setState({
        loading: false,
        posts: nextProps.posts,
        following: nextProps.user ? this.checkIsFollow(nextProps.user) : false
      });
    }
  }

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
      const userRes = await updateAccount(this.state.user._id, fd);
      if (userRes) {
        this.setState({
          updatePopup: false,
          loading: false,
          user: { ...this.state.user, name: user.name, email: user.email }
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
    this.props.getUser(this.props.match.params.userId);
    this.props.getPosts(this.props.match.params.userId);
  };

  handleFollowClick = async () => {
    if (this.state.following) {
      this.setState({ loading: true });
      const { data } = await unfollowFromUser(
        this.state.user._id,
        this.props.currentUser._id
      );
      if (data) {
        this.setState({
          loading: false,
          following: false,
          user: { ...this.state.user, followers: data.followers }
        });
      }
    } else {
      this.setState({ loading: true });
      const { data } = await followToUser(
        this.state.user._id,
        this.props.currentUser._id
      );
      if (data) {
        this.setState({
          loading: false,
          following: true,
          user: { ...this.state.user, followers: data.followers }
        });
      }
    }
  };

  handleMessageClick = async () => {
    const id = await getLinkToPrivateChannel(this.state.user._id);
    this.props.history.push(`/messages/${id}`);
  };

  render() {
    const {
      user,
      deletePopup,
      updatePopup,
      loading,
      passwordError,
      following,
      posts,
      newPostModal
    } = this.state;
    const { currentUser } = this.props;
    if (!user || !posts) {
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
        {loading && <Spinner />}
        <NewPostModal
          close={this.handleClick("newPostModal")}
          open={newPostModal}
        />
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
              <Fab
                disabled={loading}
                onClick={this.handleFollowClick}
                variant="extended"
                color={following ? "secondary" : "primary"}
              >
                {following ? "Unfollow" : "Follow"}
              </Fab>
              <Button
                disabled={loading}
                onClick={this.handleMessageClick}
                color={user.online ? "primary" : "secondary"}
              >
                Message
              </Button>
            </Styles.ButtonsWrapper>
          )}

          <UserDataTabs
            openNewPostClick={this.handleClick("newPostModal")}
            posts={posts}
            isCurrent={currentUser._id === user._id}
            user={user}
          />
        </Styles.ContentWrapper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser,
  user: state.users.selectedUser,
  posts: state.posts.posts
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
  getUser: id => dispatch(getUserById(id)),
  getPosts: id => dispatch(getPostsByUserId(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPage);
