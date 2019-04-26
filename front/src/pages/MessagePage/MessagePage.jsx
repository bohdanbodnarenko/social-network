import React, { Component, Fragment } from "react";
import { getChannelById } from "../../store/channels/actions";
import { connect } from "react-redux";
import MessageForm from "./MessageForm/MessageForm";
import MessageHeader from "./MessageHeader/MessageHeader";
import { MessagesWrapper, MessagesContainer, MessagesEnd } from "./styles";
import Spinner from "../../UI/Spinner/Spinner";
import SingleMessage from "./SingleMessage/SingleMessage";
import { sendMessage, getMessagesByChannelId } from "../../utils/requests";
import { Fade } from "react-reveal";

export class MessagePage extends Component {
  state = {
    targetUser: null,
    messageText: "",
    channel: null,
    messages: [],
    loading: false
  };
  componentDidMount = () => {
    this.props.getChannel(this.props.match.params.channelId);
  };

  componentDidUpdate(prevProps, prevState) {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.messagesEnd) {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.channel !== this.props.channel) {
      this.scrollToBottom();
      this.setState({
        messages: nextProps.channel.messages,
        channel: nextProps.channel
      });
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
    if (this.state.messageText) {
      sendMessage(this.props.channel._id, this.state.messageText);
      this.setState({ messageText: "" });
    }
  };
  //! TODO it does not work correct
  fetchMoreMessages = async () => {
    this.setState({ loading: true });
    const { data } = await getMessagesByChannelId(
      this.props.channel._id,
      this.state.messages.length
    );
    const { messages } = data;
    if (messages && messages.length > 0) {
      this.setState({
        messages: this.state.messages
          .concat(messages)
          .sort((a, b) => b.created - a.created),
        loading: false
      });
      console.log(this.state);
    }
  };

  handleScroll = event => {
    if (event.target.scrollTop < 200 && !this.state.loading) {
      // this.fetchMoreMessages();
    }
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
              <MessagesContainer
                // ref={node => node && (node.scrollTop = node.scrollHeight)}
                onScroll={this.handleScroll}
              >
                {messages.map(message => (
                  <SingleMessage
                    key={message._id}
                    message={message}
                    currentUser={currentUser}
                  />
                ))}
                <MessagesEnd ref={node => (this.messagesEnd = node)} />
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
