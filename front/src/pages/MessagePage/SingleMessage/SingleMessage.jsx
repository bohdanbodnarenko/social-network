import React from "react";
import PropTypes from "prop-types";
import { Avatar } from "@material-ui/core";
import { getLinkToUserAvatar } from "../../../utils/requests";
import moment from "moment";
import styled from "styled-components";
import { colors } from "../../../theme";
import { Link } from "react-router-dom";

const Message = styled.div`
  background-color: ${props =>
    props.own ? colors.darkGrey : colors.darkViolet};
  padding: 15px;
  border-radius: 30px;
  border-bottom-left-radius: ${props => (props.own ? 30 : 0)};
  border-bottom-right-radius: ${props => (props.own ? 0 : 30)};
  max-width: 40%;
  position: relative;
  margin: 12px;
  margin-right: ${props => (props.own ? "60px" : 0)};
  margin-left: ${props => (!props.own ? "60px" : 0)};
  float: ${props => (props.own ? "right" : "left")};
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.span`
  margin: 3px 0;
`;
const Time = styled.span`
  font-size: 0.75rem;
  opacity: 0.9;
`;

const SingleMessage = ({ currentUser, message }) => {
  const isOwn = currentUser._id === message.sender._id;
  return (
    <div style={{ width: "100%", height: 600 }}>
      <Message own={isOwn}>
        <Avatar
          style={{
            position: "absolute",
            right: isOwn ? "-50px" : "auto",
            left: !isOwn ? "-50px" : "auto",
            bottom: 0
          }}
          src={
            message.sender.photo
              ? getLinkToUserAvatar(message.sender._id)
              : "https://www.gravatar.com/avatar?d=mp&s=200"
          }
        />
        <ContentWrapper>
          <Link
            style={{ fontSize: ".9rem" }}
            to={`/user/${message.sender._id}`}
          >
            {message.sender.name}
          </Link>
          <Content>{message.content}</Content>
          <Time>{moment(message.created).fromNow()}</Time>
        </ContentWrapper>
      </Message>
    </div>
  );
};

SingleMessage.propTypes = {
  currentUser: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired
};

export default SingleMessage;
