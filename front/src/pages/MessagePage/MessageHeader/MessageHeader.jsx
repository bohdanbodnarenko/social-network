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
import { Link } from "react-router-dom";
import moment from "moment";

const MessageHeader = props => {
  const { classes, user, name } = props;
  return (
    <AppBar className={classes.root} position="static">
      <Toolbar>
        <Avatar
          src={
            user
              ? user.photo
                ? getLinkToUserAvatar(user._id)
                : "https://www.gravatar.com/avatar?d=mp&s=200"
              : "https://cdn3.iconfinder.com/data/icons/inficons-set-2/512/search-512.png"
          }
        />
        <div className={classes.textContainer}>
          <Typography className={classes.text} variant="h6" color="inherit">
            {name ||
              (user && <Link to={`/user/${user._id}`}>{user.name}</Link>)}
          </Typography>
          <Typography
            color={user && user.online ? "primary" : "inherit"}
            variant="subtitle1"
            className={classes.text}
            style={{ opacity: 0.8 }}
          >
            {user &&
              (user.online ? "online" : moment(user.lastActive).fromNow())}
          </Typography>
        </div>
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
