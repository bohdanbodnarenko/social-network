import React, { Component } from "react";
import {
  withStyles,
  Dialog,
  DialogTitle,
  Button,
  DialogActions,
  TextField,
  DialogContent,
  FormControl,
  FormLabel,
  Paper
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  getLinkToPostImage,
  getLinkToUserAvatar,
  deletePost,
  likePost,
  unlikePost,
  addComment
} from "../../utils/requests";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import moment from "moment";
import {
  Delete,
  Comment,
  Favorite,
  FavoriteBorderOutlined
} from "@material-ui/icons";
import Spinner from "../../UI/Spinner/Spinner";
import red from "@material-ui/core/colors/red";
import CommentsList from "../CommentsList/CommentsList";
import Fade from "react-reveal/Fade";

const styles = theme => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  card: {
    margin: 15,
    minWidth: 370
  },
  liked: {
    color: red[800]
  },
  header: {
    display: "inline-flex",
    padding: "16px",
    margin: 5,
    float: "left",
    backgroundColor: "rgba(70,70,70,0.65)",
    borderRadius: 12
  },
  media: {
    height: 0,
    paddingTop: "36.25% " // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end"
  },
  commentModal: {
    width: "40vw"
  }
});

class SinglePost extends Component {
  state = {
    deleteModal: false,
    newCommentModal: false,
    commentText: "",
    loading: false
  };

  toggleModal = name => () => {
    this.setState({ [name]: !this.state[name] });
  };

  handleLikeClick = (postId, userId) => async () => {
    this.setState({ loading: true });
    if (this.checkIsLiked()) {
      const res = await unlikePost(postId, userId);
      if (res) {
        this.setState({ loading: false });
      }
    } else {
      const res = await likePost(postId, userId);
      if (res) {
        this.setState({ loading: false });
      }
    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  checkIsLiked = () =>
    this.props.post.likes.includes(this.props.currentUser._id);

  submitNewPost = text => async event => {
    event.preventDefault();
    this.setState({ loading: true });
    const res = await addComment(
      text,
      this.props.post._id,
      this.props.currentUser._id
    );
    if (res) {
      this.setState({
        loading: false,
        newCommentModal: false,
        commentText: ""
      });
    }
  };

  deletePost = id => async () => {
    this.setState({ loading: true });
    const res = await deletePost(id);
    if (res) {
      this.setState({ loading: false, deleteModal: false });
    }
  };

  render() {
    const { deleteModal, loading, newCommentModal, commentText } = this.state;
    const { classes, post, currentUser, withComments } = this.props;
    return (
      <div>
        {loading && <Spinner small />}
        <Dialog onClose={this.toggleModal("deleteModal")} open={deleteModal}>
          <DialogTitle>Are you sure to delete this post?</DialogTitle>
          <DialogActions>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.deletePost(post._id)}
            >
              Yes
            </Button>
            <Button>No</Button>
          </DialogActions>
        </Dialog>
        <Dialog
          onClose={this.toggleModal("newCommentModal")}
          open={newCommentModal}
        >
          <form
            onSubmit={this.submitNewPost(commentText)}
            className={classes.commentModal}
          >
            {loading && <Spinner small />}
            <DialogTitle>Add a new comment</DialogTitle>
            <DialogContent>
              <FormControl className={classes.formControl} fullWidth>
                <FormLabel htmlFor="commentInput">
                  Write your comment here
                </FormLabel>
                <TextField
                  id="commentInput"
                  name="commentText"
                  onChange={this.handleChange}
                  type="text"
                  fullWidth
                  value={commentText}
                  multiline
                  required
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button
                disabled={loading}
                variant="contained"
                fullWidth
                type="submit"
                color="primary"
                onClick={this.submitNewPost(commentText)}
              >
                Submit
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Fade>
          <Card className={classes.card}>
            <CardHeader
              className={classes.header}
              avatar={
                post.postedBy && (
                  <Avatar
                    src={
                      post.postedBy.photo
                        ? getLinkToUserAvatar(post.postedBy._id)
                        : "https://www.gravatar.com/avatar?d=mp&s=200"
                    }
                  />
                )
              }
              title={
                <Link to={`/user/${post.postedBy._id}`}>
                  {post.postedBy.name}
                </Link>
              }
              subheader={moment(post.created).fromNow()}
            />

            <Link to={`/post/${post._id}`}>
              {post.photo && (
                <CardMedia
                  className={classes.media}
                  image={getLinkToPostImage(post._id)}
                  title="Paella dish"
                />
              )}
              <CardContent>
                <Typography component="h6">{post.title}</Typography>
                <Typography component="p">{post.body}</Typography>
              </CardContent>
            </Link>
            <CardActions className={classes.actions} disableActionSpacing>
              <IconButton
                color="secondary"
                onClick={this.handleLikeClick(post._id, currentUser._id)}
                aria-label="Like"
              >
                {this.checkIsLiked() ? (
                  <Favorite color="secondary" />
                ) : (
                  <FavoriteBorderOutlined />
                )}
              </IconButton>
              {post.likes.length}
              <IconButton
                onClick={this.toggleModal("newCommentModal")}
                aria-label="Comment"
              >
                <Comment />
              </IconButton>
              {post.commentsCount}
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              {post.postedBy._id === currentUser._id && (
                <IconButton onClick={this.toggleModal("deleteModal")}>
                  <Delete />
                </IconButton>
              )}
            </CardActions>
            {withComments && (
              <Paper style={{ width: "90vw", margin: "auto" }}>
                <CommentsList comments={post.comments} />
              </Paper>
            )}
          </Card>
        </Fade>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.auth.currentUser
});
export default connect(mapStateToProps)(withStyles(styles)(SinglePost));
