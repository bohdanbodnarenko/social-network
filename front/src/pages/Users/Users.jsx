import React, { Component } from "react";
import * as Styles from "./styles";
import Spinner from "../../UI/Spinner/Spinner";
import SingleUser from "../../components/SingleUser/SingleUser";
import { connect } from "react-redux";
import { getAllUsers } from "../../store/users/actions";
export class Users extends Component {
  state = {
    users: null
  };
  componentDidMount = () => {
    this.props.getUsers();
  };

  render() {
    const { users } = this.props;
    if (users.length < 1) {
      return <Spinner />;
    }
    return (
      <div>
        <Styles.UsersWrapper>
          {users.map(user => (
            <SingleUser user={user} key={user._id} />
          ))}
        </Styles.UsersWrapper>
      </div>
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users: users.users
});

const mapDispatchToProps = dispatch => ({
  getUsers: () => dispatch(getAllUsers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Users);
