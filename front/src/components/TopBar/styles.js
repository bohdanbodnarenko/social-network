import styled, { keyframes } from "styled-components";

export const styles = theme => ({
  root: {
    width: "100%"
  },
  appBar: {
    backgroundColor: "#222222",
    boxShadow: "none"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    fontWeight: "400"
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  button: {
    margin: theme.spacing.unit,
    maxHeight: 40,
    zIndex: "10"
  }
});

export const SideMenu = styled.div`
  z-index: 999;
  border-radius: 50%;
  box-shadow: ${props =>
    props.open ? "0 0 0 225vh rgba(106, 86, 255,.9)" : ""};
  background-color: ${props => (props.open ? "rgba(106, 86, 255,.9)" : "")};
  color: "#6A56FF";
  border: none;
  outline: none;
  transition: 0.3s ease-in-out;
`;

export const LinksWrapper = styled.div`
  position: absolute;
  top: 15vh;
  left: calc(50% - 20px);
  transform: translateX(-45%);
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  `;
export const CustomLink = styled.span`
  font-size: 3em;
  margin: 30px 0;
  animation: 1s ${fadeIn} ease-out;
  animation-duration: 500ms;
`;
export const CloseWrapper = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
`;
