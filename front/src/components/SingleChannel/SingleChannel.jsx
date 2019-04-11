import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { getLinkToUserAvatar } from "../../utils/requests";
import Fade from "react-reveal/Fade";

const SingleChannel = ({ channel, currentUser }) => {
  const targetUser = channel.participants.filter(
    el => el._id !== currentUser._id
  )[0];

  return (
    <Fade>
      <Link to={`/messages/${channel._id}`}>
        <ListItem
          divider
          style={{ width: "89vw", margin: "10px 0" }}
          alignItems="center"
        >
          <ListItemAvatar>
            <Avatar
              alt={targetUser.name}
              src={
                targetUser.photo
                  ? getLinkToUserAvatar(targetUser._id)
                  : "https://www.gravatar.com/avatar?d=mp&s=200"
              }
            />
          </ListItemAvatar>
          <ListItemText primary={channel.name ? channel : targetUser.name} />
        </ListItem>
      </Link>
    </Fade>
  );
};

SingleChannel.propTypes = {
  channel: PropTypes.object.isRequired
};

export default SingleChannel;
