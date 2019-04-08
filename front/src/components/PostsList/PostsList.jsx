import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SinglePost from "../SinglePost/SinglePost";

const styles = theme => ({
  root: {
    // width: "100%",
    backgroundColor: theme.palette.background.paper,
    dispay: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "20px 10px",
    borderRadius: "10px"
  },
  card: {
    margin: 15,
    minWidth: 370
  },
  media: {
    height: 0,
    paddingTop: "36.25% " // 16:9
  },
  actions: {
    display: "flex"
  }
});
const PostsList = props => {
  const { classes, posts } = props;
  return (
    <div className={classes.root}>
      {posts.map(post => (
        <SinglePost key={post._id} post={post} />
      ))}
    </div>
  );
};

PostsList.propTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired
};

export default withStyles(styles)(PostsList);
