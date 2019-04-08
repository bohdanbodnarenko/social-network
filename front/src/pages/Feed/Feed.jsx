import React, { Component } from "react";
import { styles } from "./styles";
import { withStyles, Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PostsList from "../../components/PostsList/PostsList";
import { getAllPosts, getFollowingPosts } from "../../utils/requests";
import Spinner from "../../UI/Spinner/Spinner";

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
  };

  getPosts = async () => {
    this.setState({ loading: true });
    if (this.state.onlyFollowing) {
      const { data } = await getFollowingPosts();
      console.log(data);
      this.setState({ loading: false, posts: data.posts });
    } else {
      const { data } = await getAllPosts();
      console.log(data);
      this.setState({ loading: false, posts: data.posts });
    }
  };

  componentDidMount = () => {
    this.getPosts();
  };

  render() {
    const { posts, loading } = this.state;
    const { classes } = this.props;
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
          {loading ? <Spinner small /> : <PostsList posts={posts} />}
          {/* <PostsList posts={posts} /> */}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Feed);
