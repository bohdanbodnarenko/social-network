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
    messageText: "",
    channel: null,
    messages: []
  };
  componentDidMount = () => {
    this.props.getChannel(this.props.match.params.channelId);
    this.scrollToBottom();
  };

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.channel !== this.props.channel) {
      this.scrollToBottom();
      this.setState({ messages: nextProps.channel.messages });
    }
    if (
      !this.state.channel ||
      nextProps.channel._id !== this.state.channel._id
    ) {
      this.setState({ channel: nextProps.channel });
      if (nextProps.channel && nextProps.channel.isPrivate) {
        this.setState({
          targetUser: nextProps.channel.participants.filter(
            el => el._id !== nextProps.currentUser._id
          )[0]
        });
      }
    }
  }

  handleChange = event => {
    this.setState({
      messageText: event.target.value
    });
  };
  sendMessage = () => {
    sendMessage(this.props.channel._id, this.state.messageText);
    this.setState({ messageText: "" });
  };

  render() {
    const { targetUser, messageText, messages } = this.state;
    const { currentUser, channel } = this.props;
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
                <div
                  style={{
                    position: "relative",
                    bottom: "0px",
                    paddingTop: "8%"
                  }}
                  ref={node => (this.messagesEnd = node)}
                />
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
