import styled from "styled-components";

export const Wrapper = styled.div `
  /* width: 100vw;
  height: 40vh;
  position: relative; */
`;

export const Shape1 = styled.div `
/* position:fixed;
  width: 100%;
  height: 40vh;
  background-color: #03a9f4;
  clip-path: polygon(100% 0, 100% 5%, 15% 100%, 0 100%, 0 0);
  overflow: visible; */
`;
export const Shape2 = styled.div `
position:fixed;
right:0;
bottom:0;
  width: 100%;
  height: 40vh;
  background-color: #faa916;
  clip-path: polygon(63% 84%, 100% 76%, 100% 100%, 33% 100%);
  overflow: visible;
`;

export const ContentWrapper = styled.div `
  position: absolute;
  top: calc(25% - 20px);
  left: calc(50% - 20px);
  width:375px;
  transform: translateX(-45%);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;
export const Image = styled.img `
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;
export const Text = styled.span `
  font-weight: bold;
  font-size: 2rem;
`;
export const SmallText = styled.span `
  font-weight: bold;
  font-size: 0.9rem;
`;

export const ControllMenu = styled.div `
  position: absolute;
  right: 0;
`;