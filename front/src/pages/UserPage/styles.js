import styled from "styled-components";

export const Wrapper = styled.div `
    width:100vw;
    height:40vh;
    position:relative;
`

export const TopWrapper = styled.div `
    width:100%;
    height:100%;
    background-color:#03A9F4;
    clip-path: polygon(100% 0, 100% 5%, 15% 100%, 0 100%, 0 0);
    overflow:visible;
`;

export const ContentWrapper = styled.div `
    position:absolute;
    left:45%;
    transform:translateX(-45%);
    top:40%;
    display:flex;
    flex-direction:column;
    align-items:center;
    text-align:center;
`;
export const Image = styled.img `
    width:120px;
    height:120px;
    border-radius:50%;
`;
export const Text = styled.span `
    font-weight:bold;
    font-size:2rem;
`
export const SmallText = styled.span `
    font-weight:bold;
    font-size:.9rem;
`

export const ControllMenu = styled.div `
    position:absolute;
    right:0;
`;