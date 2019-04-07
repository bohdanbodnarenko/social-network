import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { getLinkToUserAvatar } from "../../utils/requests";
import moment from "moment";

const SingleComment = ({ comment }) => {
  return (
    <ListItem
      divider
      style={{ width: "89vw", marginBottom: "10px" }}
      alignItems="center"
    >
      <ListItemAvatar>
        <Avatar
          alt={comment.postedBy.name}
          src={getLinkToUserAvatar(comment.postedBy._id)}
        />
      </ListItemAvatar>
      <ListItemText
        primary={comment.postedBy.name}
        secondary={
          <React.Fragment>
            <Typography component="span" color="textPrimary">
              {comment.text}
            </Typography>
            {moment(comment.created).fromNow()}
          </React.Fragment>
        }
      />
    </ListItem>
  );
};

SingleComment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default SingleComment;
