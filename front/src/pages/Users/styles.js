import styled from "styled-components";

export const Shape = styled.div`
  position: fixed;
  min-height: 100%;
  width: 105%;
  background: #03a9f4;
  clip-path: polygon(0 0, 0% 100%, 100% 65%);
  z-index: -1;
`;
export const UsersWrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;
