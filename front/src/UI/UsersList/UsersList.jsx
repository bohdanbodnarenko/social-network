import React from "react";
import PropTypes from "prop-types";
import * as Router from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { getLinkToUserAvatar } from "../../utils/requests";
import { Link } from "@material-ui/core";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  inline: {
    display: "inline"
  }
});
const UsersList = props => {
  const { classes, users } = props;
  return (
    <List className={classes.root}>
      {users.map((user, i) => (
        <Link
          component={Router.Link}
          to={`/user/${user._id}`}
          key={user._id + i}
        >
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={user.name}
                src={
                  user.photo
                    ? getLinkToUserAvatar(user._id)
                    : "https://www.gravatar.com/avatar?d=mp&s=200"
                }
              />
            </ListItemAvatar>
            <ListItemText primary={user.name} />
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

UsersList.propTypes = {
  classes: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
};

export default withStyles(styles)(UsersList);
