import React, { Component } from "react";
import { connect } from "react-redux";
import { getChannels } from "../../store/channels/actions";
import ChannelsList from "../../components/ChannelsList/ChannelsList";

export class Messages extends Component {
  state = {
    channels: null
  };

  componentDidMount() {
    this.props.getChannels();
  }

  render() {
    const { channels, currentUser } = this.props;
    return (
      <div>
        {channels && channels.length > 0 && (
          <ChannelsList currentUser={currentUser} channels={channels} />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth, channels }) => ({
  channels: channels.channels,
  currentUser: auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  getChannels: () => dispatch(getChannels())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages);
