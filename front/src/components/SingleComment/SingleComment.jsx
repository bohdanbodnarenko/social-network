import React from "react";
import { Link } from "react-router-dom";
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
      style={{ width: "89vw", margin: "10px 0" }}
      alignItems="center"
    >
      <ListItemAvatar>
        <Avatar
          alt={comment.postedBy.name}
          src={
            comment.postedBy.photo
              ? getLinkToUserAvatar(comment.postedBy._id)
              : "https://www.gravatar.com/avatar?d=mp&s=200"
          }
        />
      </ListItemAvatar>
      <ListItemText
        primary={
          <Link to={`/user/${comment.postedBy._id}`}>
            {comment.postedBy.name}
          </Link>
        }
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
