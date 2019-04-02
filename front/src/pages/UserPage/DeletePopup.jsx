import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import Spinner from "../../UI/Spinner/Spinner";

class DeletePopup extends Component {
  state = {
    password: ""
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    const { password } = this.state;
    const { open, error, loading } = this.props;
    return (
      <Dialog onClose={this.props.close} open={open}>
        <form onSubmit={this.props.submit(password)}>
          <DialogTitle>
            {this.props.user.name}, are you sure to delete your account?
          </DialogTitle>
          <DialogContent>
            <TextField
              error={!!error}
              label="Confirm your password"
              helperText={error}
              onChange={this.handleChange}
              name="password"
              fullWidth
              type="password"
            />
            {loading && <Spinner small />}
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="secondary">
              Yes
            </Button>
            <Button onClick={this.props.close} color="primary">
              No
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default DeletePopup;
