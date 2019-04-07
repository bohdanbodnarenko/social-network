import React from "react";
import styled from "styled-components";
const ShapeWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${props => props.bg};
  z-index: -1;
  opacity: 0.35;
  transition: ${props => props.transition}s ease-in-out;
  clip-path: ${props => props.path};
  border: none;
`;

const Shape = ({ path, bg, transition }) => (
  <ShapeWrapper bg={bg} transition={transition} path={path} />
);
export default Shape;
