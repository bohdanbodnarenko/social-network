import React, { Component } from "react";
import { styles } from "./styles";
import { withStyles, Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PostsList from "../../components/PostsList/PostsList";
import Spinner from "../../UI/Spinner/Spinner";
import { connect } from "react-redux";
import { getAllPosts, getPostsFollowing } from "../../store/posts/actions";
import Fade from "react-reveal/Fade";
export class Feed extends Component {
  state = {
    onlyFollowing: true,
    posts: [],
    loading: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (!this.state.onlyFollowing === prevState.onlyFollowing) {
      this.getPosts();
    }
    if (prevProps.posts !== this.props.posts) {
      this.setState({ loading: false });
    }
  };

  getPosts = async () => {
    this.setState({ loading: true });
    if (this.state.onlyFollowing) {
      this.props.getFollowing();
    } else {
      this.props.getAllPosts();
    }
  };

  componentDidMount = () => {
    this.getPosts();
  };

  render() {
    const { loading } = this.state;
    const { classes, posts } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.switchWrapper}>
          <FormControlLabel
            label="Only following/all posts"
            control={
              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked
                }}
                disableRipple
                checked={this.state.onlyFollowing}
                onChange={this.handleChange("onlyFollowing")}
                value="onlyFollowing"
              />
            }
          />
        </div>
        <div className={classes.postsWrapper}>
          {loading ? (
            <Spinner small />
          ) : (
            <Fade>
              <PostsList posts={posts} />
            </Fade>
          )}
          {/* <PostsList posts={posts} /> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ posts }) => ({
  posts: posts.posts
});

const mapDispatchToProps = dispatch => ({
  getAllPosts: () => dispatch(getAllPosts()),
  getFollowing: () => dispatch(getPostsFollowing())
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Feed)
);
