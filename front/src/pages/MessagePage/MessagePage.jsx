import React, { Component } from "react";
import { getChannelById } from "../../store/channels/actions";
import { connect } from "react-redux";
import MessageForm from "./MessageForm/MessageForm";

export class MessagePage extends Component {
  componentDidMount = () => {
    this.props.getChannel(this.props.match.params.channelId);
  };

  render() {
    return (
      <div>
        Message!
        <MessageForm />
      </div>
    );
  }
}

const mapStateToProps = ({ auth, channels }) => ({
  channel: channels.selectedChannel,
  currentUser: auth.currentUser
});

const mapDispatchToProps = dispatch => ({
  getChannel: id => dispatch(getChannelById(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessagePage);
