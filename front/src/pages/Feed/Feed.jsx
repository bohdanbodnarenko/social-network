import React, { Component } from "react";
import { styles } from "./styles";
import { withStyles, Switch } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import PostsList from "../../components/PostsList/PostsList";
import { getAllPosts } from "../../utils/requests";
import Spinner from "../../UI/Spinner/Spinner";

export class Feed extends Component {
  state = {
    onlySubcr: true,
    posts: [],
    loading: true
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  componentDidMount = async () => {
    const { data } = await getAllPosts();
    this.setState({ loading: false, posts: data.posts });
    console.log(data.posts);
  };

  render() {
    const { posts, loading } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.switchWrapper}>
          <FormControlLabel
            label="Switch only subscriptions/all posts"
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
                checked={this.state.onlySubcr}
                onChange={this.handleChange("onlySubcr")}
                value="onlySubcr"
              />
            }
          />
        </div>
        <div className={classes.postsWrapper}>
          {loading ? <Spinner small /> : <PostsList posts={posts} />}
          <PostsList posts={posts} />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Feed);
