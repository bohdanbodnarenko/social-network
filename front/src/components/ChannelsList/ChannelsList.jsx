import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import SingleChannel from "../SingleChannel/SingleChannel";

const styles = theme => ({
  root: {
    width: "93%",
    margin: "30px auto",
    backgroundColor: theme.palette.background.paper
  }
});

const Channels = ({ channels, classes, currentUser }) => (
  <List className={classes.root}>
    {channels.map(channel => (
      <SingleChannel
        currentUser={currentUser}
        key={channel._id}
        channel={channel}
      />
    ))}
  </List>
);

Channels.propTypes = {
  classes: PropTypes.object.isRequired,
  channels: PropTypes.array.isRequired
};

export default withStyles(styles)(Channels);
