import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import SingleComment from "../SingleComment/SingleComment";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

const CommentsList = ({ comments, classes }) => (
  <List className={classes.root}>
    {comments.map(comment => (
      <SingleComment key={comment._id} comment={comment} />
    ))}
  </List>
);

CommentsList.propTypes = {
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array.isRequired
};

export default withStyles(styles)(CommentsList);
