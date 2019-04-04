import styled from "styled-components";

export const ContentWrapper = styled.div `
  position: absolute;
  top: calc(20%);
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
  margin-top:.2em;
`;
export const SmallText = styled.span `
  font-weight: bold;
  font-size: 0.9rem;
  margin-top:.3em ;
`;

export const ControllMenu = styled.div `
  position: absolute;
  right: 0;
`;

export const ButtonsWrapper = styled.div `
margin-top:.6em;
height:10vh;
display:flex;
flex-direction:column;
`