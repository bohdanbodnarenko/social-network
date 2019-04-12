import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import { styles } from "./styles";
import { Avatar } from "@material-ui/core";
import { getLinkToUserAvatar } from "../../../utils/requests";

const MessageHeader = props => {
  const { classes, user, name } = props;
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Avatar
          src={
            user.photo
              ? getLinkToUserAvatar(user._id)
              : "https://www.gravatar.com/avatar?d=mp&s=200"
          }
        />
        <Typography
          className={classes.title}
          variant="h6"
          color="inherit"
          noWrap
        >
          {name || user.name}
        </Typography>
        <div className={classes.grow} />
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
          />
        </div>
      </Toolbar>
    </AppBar>
  );
};

MessageHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MessageHeader);