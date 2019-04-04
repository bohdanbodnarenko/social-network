import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import { Paper, Button } from "@material-ui/core";
import UsersList from "../../UI/UsersList/UsersList";

function TabContainer({ children, dir }) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{ padding: 8 * 3, maxHeight: 600, overflowY: "scroll" }}
    >
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    width: "90vw",

    margin: "40px 0px"
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
    const { classes, theme, user, posts, isCurrent } = this.props;
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
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            {isCurrent && <Button>Create Post</Button>}
            <div>Posts will be here</div>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <UsersList users={user.followers} />
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <UsersList users={user.following} />
          </TabContainer>
        </SwipeableViews>
      </Paper>
    );
  }
}

UserDataTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(UserDataTabs);
