import styled from "styled-components";

export const MessagesWrapper = styled.div`
  width: 98vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: red;
  margin: 10px auto;
  height: 91vh;
  background-color: #222222;
  position: relative;
  border-radius: 10px;
`;

export const MessagesContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 100%;
  height: 95%;
  padding: 15px 10px;
  position: relative;
  /* padding-bottom:50px */
`;
