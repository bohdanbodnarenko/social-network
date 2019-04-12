import React, { Component, Fragment } from "react";
import { getChannelById } from "../../store/channels/actions";
import { connect } from "react-redux";
import MessageForm from "./MessageForm/MessageForm";
import MessageHeader from "./MessageHeader/MessageHeader";
import { MessagesWrapper } from "./styles";
import Spinner from "../../UI/Spinner/Spinner";

export class MessagePage extends Component {
  state = {
    targetUser: null
  };
  componentDidMount = () => {
    this.props.getChannel(this.props.match.params.channelId);
  };

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props.channel && this.props.channel.isPrivate) {
  //     this.setState({
  //       targetUser: this.props.channel.participants.filter(
  //         el => el._id !== this.props.currentUser._id
  //       )[0]
  //     });
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.channel && nextProps.channel.isPrivate) {
      this.setState({
        targetUser: nextProps.channel.participants.filter(
          el => el._id !== nextProps.currentUser._id
        )[0]
      });
    }
  }

  render() {
    const { targetUser } = this.state;
    const { channel } = this.props;
    return (
      <MessagesWrapper>
        {channel ? (
          <Fragment>
            <MessageHeader user={targetUser} name={channel.name} />
            Message!
            <MessageForm />
          </Fragment>
        ) : (
          <Spinner small />
        )}
      </MessagesWrapper>
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
