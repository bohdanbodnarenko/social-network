import React, { Component, Fragment } from "react";
import { getChannelById } from "../../store/channels/actions";
import { connect } from "react-redux";
import MessageForm from "./MessageForm/MessageForm";
import MessageHeader from "./MessageHeader/MessageHeader";
import { MessagesWrapper, MessagesContainer } from "./styles";
import Spinner from "../../UI/Spinner/Spinner";
import SingleMessage from "./SingleMessage/SingleMessage";
import { sendMessage } from "../../utils/requests";
import { Fade } from "react-reveal";

export class MessagePage extends Component {
  state = {
    targetUser: null,
    messageText: ""
  };
  componentDidMount = () => {
    this.props.getChannel(this.props.match.params.channelId);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.channel && nextProps.channel.isPrivate) {
      this.setState({
        targetUser: nextProps.channel.participants.filter(
          el => el._id !== nextProps.currentUser._id
        )[0]
      });
    }
  }

  handleChange = event => {
    this.setState({ messageText: event.target.value });
  };
  sendMessage = () => {
    sendMessage(this.props.channel._id, this.state.messageText);
    this.setState({ messageText: "" });
  };

  render() {
    const { targetUser, messageText } = this.state;
    const { channel, currentUser } = this.props;
    return (
      <Fade>
        <MessagesWrapper>
          {channel ? (
            <Fragment>
              <MessageHeader user={targetUser} name={channel.name} />
              <MessagesContainer>
                {channel.messages.map(message => (
                  <SingleMessage
                    key={message._id}
                    message={message}
                    currentUser={currentUser}
                  />
                ))}
              </MessagesContainer>
              <MessageForm
                messageText={messageText}
                submit={this.sendMessage}
                change={this.handleChange}
              />
            </Fragment>
          ) : (
            <Spinner small />
          )}
        </MessagesWrapper>
      </Fade>
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
