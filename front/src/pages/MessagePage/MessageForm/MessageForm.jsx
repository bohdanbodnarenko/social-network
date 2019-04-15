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
    padding: "2px 0",
    display: "flex",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0
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

  const handleKeyPress = event => {
    if (event.key === "Enter") {
      props.submit();
    }
  };

  return (
    <Paper className={classes.root} elevation={1}>
      <IconButton className={classes.iconButton} aria-label="File">
        <Icons.LinkRounded />
      </IconButton>
      <Divider className={classes.divider} />
      <InputBase
        onKeyPress={handleKeyPress}
        onChange={props.change}
        name="message"
        className={classes.input}
        placeholder="Type your message..."
        value={props.messageText}
      />
      <IconButton className={classes.iconButton} aria-label="Message">
        <Icons.TagFacesRounded />
      </IconButton>
      <Divider className={classes.divider} />
      <IconButton
        onClick={props.submit}
        color="primary"
        className={classes.iconButton}
      >
        <Icons.SendRounded />
      </IconButton>
    </Paper>
  );
};

MessageForm.propTypes = {
  classes: PropTypes.object.isRequired,
  submit: PropTypes.func.isRequired,
  change: PropTypes.func.isRequired,
  messageText: PropTypes.string.isRequired
};

export default withStyles(styles)(MessageForm);
