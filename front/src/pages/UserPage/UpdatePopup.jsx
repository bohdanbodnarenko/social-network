import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Input,
  Avatar,
  FormLabel
} from "@material-ui/core";
import Spinner from "../../UI/Spinner/Spinner";

class UpdatePopup extends Component {
  state = {
    password: "",
    name: this.props.user.name,
    email: this.props.user.email,
    photo: null
  };

  handleChange = event => {
    const value =
      event.target.name === "photo"
        ? event.target.files[0]
        : event.target.value;
    this.setState({ [event.target.name]: value });
  };
  render() {
    const { name, email, password, photo } = this.state;
    const { open, error, loading, user, imageSrc } = this.props;
    return (
      <Dialog onClose={this.props.close} open={open}>
        <DialogTitle>
          {user.name}, are you sure to delete your account?
        </DialogTitle>
        <form onSubmit={this.props.submit(password, { name, email, photo })}>
          <DialogContent>
            {loading && <Spinner small />}
            <Avatar style={{ width: "100px", height: "100px" }} src={imageSrc} />
            <FormLabel htmlFor="photoInput">Change image</FormLabel>
            <Input
              onChange={this.handleChange}
              id="photoInput"
              name="photo"
              type="file"
              fullWidth
            />
            <TextField
              label="Email"
              value={email}
              onChange={this.handleChange}
              name="email"
              fullWidth
              type="email"
            />
            <TextField
              label="Name"
              value={name}
              onChange={this.handleChange}
              name="name"
              fullWidth
              type="text"
            />
            <TextField
              error={!!error}
              label="Confirm your password"
              helperText={error}
              onChange={this.handleChange}
              name="password"
              fullWidth
              type="password"
            />
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

export default UpdatePopup;
