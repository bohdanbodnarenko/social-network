import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Input,
  FormLabel,
  withStyles,
  FormControl
} from "@material-ui/core";
import Spinner from "../../UI/Spinner/Spinner";
import { styles } from "./styles";
import { createPost } from "../../utils/requests";

class NewPostModal extends Component {
  state = {
    title: "",
    body: "",
    photo: null,
    loading: false
  };

  handleSubmit = (title, body, photo) => async event => {
    event.preventDefault();
    this.setState({ loading: true });
    let fd = new FormData();
    fd.append("photo", photo);
    fd.append("title", title);
    fd.append("body", body);
    const resp = await createPost(fd);
    if (resp) {
      this.setState({ loading: false });
      this.props.close();
    }
  };

  handleChange = event => {
    const value =
      event.target.name === "photo"
        ? event.target.files[0]
        : event.target.value;
    this.setState({ [event.target.name]: value });
  };

  render() {
    const { title, body, photo, loading } = this.state;
    const { open, classes } = this.props;
    return (
      <Dialog onClose={this.props.close} open={open}>
        <DialogTitle className={classes.title}>Create a new Post</DialogTitle>
        <form onSubmit={this.handleSubmit(title, body, photo)}>
          <DialogContent>
            {loading && <Spinner small />}
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel htmlFor="titleInput">Title of your new Post</FormLabel>
              <TextField
                id="titleInput"
                onChange={this.handleChange}
                name="title"
                fullWidth
                type="text"
                required
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel htmlFor="bodyInput">Body of your new Post</FormLabel>
              <TextField
                id="bodyInput"
                onChange={this.handleChange}
                name="body"
                type="text"
                fullWidth
                multiline
                InputProps={{
                  classes: {
                    input: classes.resize
                  }
                }}
                required
              />
            </FormControl>
            <FormControl className={classes.formControl} fullWidth>
              <FormLabel htmlFor="photoInput">Add some image</FormLabel>
              <Input
                onChange={this.handleChange}
                id="photoInput"
                name="photo"
                type="file"
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button fullWidth type="submit" color="primary" variant="contained">
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  }
}

export default withStyles(styles)(NewPostModal);
