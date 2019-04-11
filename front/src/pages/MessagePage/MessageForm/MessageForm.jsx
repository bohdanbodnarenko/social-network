import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import * as Icons from "@material-ui/icons";

const styles = {
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center"
  },
  input: {
    marginLeft: 8,
    flex: 1
  },
  iconButton: {
    padding: 10
  },
  divider: {
    width: 1,
    height: 28,
    margin: 4
  }
};

const MessageForm = props => {
  const { classes } = props;

  return (
    <Paper className={classes.root} elevation={1}>
      <IconButton className={classes.iconButton} aria-label="Menu">
        <Icons.LinkRounded />
      </IconButton>
      <InputBase className={classes.input} placeholder="Search Google Maps" />
      <IconButton className={classes.iconButton} aria-label="Search">
        <Icons.TagFacesRounded />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton
        color="primary"
        className={classes.iconButton}
        aria-label="Directions"
      >
        <Icons.SendRounded />
      </IconButton>
    </Paper>
  );
};

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageForm);
