import React, { Component } from "react";
import {
  getUserById,
  confirmPassword,
  deleteAccount,
  updateAccount
} from "../../utils/requests";
import Spinner from "../../UI/Spinner/Spinner";
import * as Styles from "./styles";
import moment from "moment";
import { connect } from "react-redux";
import * as Icons from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import DeletePopup from "./DeletePopup";
import { logout } from "../../store/auth/actions";
import UpdatePopup from "./UpdatePopup";
export class UserPage extends Component {
  state = {
    user: null,
    deletePopup: false,
    updatePopup: false,
    loading: false,
    passwordError: ""
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

  submitUpdate = (password, user) => async event => {
    //TODO convert to binary and fix fd
    event.preventDefault();
    let fd = new FormData(event.target);
    // for (let value of Object.entries(user)) {
    //   fd.append(value[0], value[1]);
    // }
    fd.append("photo", user.photo);
    fd.append("name", user.name);
    fd.append("email", user.email);
    console.log(typeof user.photo);
    console.log(fd.photo);
    if (!password) {
      return this.setState({ passwordError: "Field should be filled" });
    }
    if (!user || !user.name || !user.name) {
      return this.setState({ passwordError: "Fields can't be empty!" });
    }
    this.setState({ loading: true });
    const { correct } = await confirmPassword(password);
    if (correct) {
      const res = await updateAccount(this.state.user._id, user);
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
    this.setState({ user, loading: false });
  };

  render() {
    const {
      user,
      deletePopup,
      updatePopup,
      loading,
      passwordError
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
      <Styles.Wrapper>
        <DeletePopup
          loading={loading}
          error={passwordError}
          submit={this.submitDelete}
          close={this.handleClick("deletePopup")}
          open={deletePopup}
          user={user}
        />
        <UpdatePopup
          loading={loading}
          error={passwordError}
          submit={this.submitUpdate}
          close={this.handleClick("updatePopup")}
          open={updatePopup}
          user={user}
        />
        <Styles.Shape2 />
        <Styles.ContentWrapper>
          <Styles.Image
            src={user.photo || "https://www.gravatar.com/avatar?d=mp&s=200"}
            alt={user.name}
          />
          {currentUser._id === user._id && renderControllMenu}
          <Styles.Text>{user.name}</Styles.Text>
          <Styles.Text>{user.email}</Styles.Text>
          <Styles.SmallText>
            With us from {moment(user.created).format("LLL")}
          </Styles.SmallText>
        </Styles.ContentWrapper>
      </Styles.Wrapper>
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
