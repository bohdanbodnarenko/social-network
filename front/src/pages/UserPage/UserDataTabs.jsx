import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Paper, Button } from "@material-ui/core";
import UsersList from "../../components/UsersList/UsersList";
import PostsList from "../../components/PostsList/PostsList";
import { TabContentWrapper } from "./styles";

const styles = theme => ({
  root: {
    width: "90vw",
    margin: "40px 0px 20px 0"
  }
});

class UserDataTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, user, posts, isCurrent } = this.props;
    return (
      <Paper className={classes.root}>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label={`${posts.length} Posts`} />
          <Tab label={`${user.followers.length} Followers`} />
          <Tab label={`${user.following.length} Following`} />
        </Tabs>
        <SwipeableViews
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContentWrapper>
            {isCurrent && (
              <Button onClick={this.props.openNewPostClick}>Create Post</Button>
            )}
            <TabContentWrapper>
              {posts && posts.length > 0 ? (
                <PostsList posts={posts} />
              ) : (
                `${user.name} have not any post yet`
              )}
            </TabContentWrapper>
          </TabContentWrapper>
          <TabContentWrapper>
            <UsersList users={user.followers} />
          </TabContentWrapper>
          <TabContentWrapper>
            <UsersList users={user.following} />
          </TabContentWrapper>
        </SwipeableViews>
      </Paper>
    );
  }
}

UserDataTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserDataTabs);
