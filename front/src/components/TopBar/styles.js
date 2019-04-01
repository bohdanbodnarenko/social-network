import styled, {
  keyframes
} from "styled-components";

export const styles = theme => ({
  root: {
    width: "100%"
  },
  appBar: {
    backgroundColor: "#fff",
    boxShadow: "rgba(31,53,78,0.11) 0 1px"
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
    zIndex: "10"
  }
});



export const SideMenu = styled.div `
  z-index:200;
  border-radius:50%;
  box-shadow: ${props => props.open ? "0 0 0 180vh rgba(250, 169, 22,.9)" : ""};
  background-color:${props => props.open ? "rgba(250, 169, 22,.9)" : "#fff"}; 
  border:none;
  outline:none;
  transition:.3s ease-in-out;
`

export const LinksWrapper = styled.div `
  position:absolute;
  top:30vh;
  left:45%;
  transform:translateX(-45%);
  min-width:300px;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
`

const fadeIn = keyframes `
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
  `
export const CustomLink = styled.span `
    font-size:3em;
    margin: 30px 0;
    animation: 1s ${fadeIn} ease-out;
    animation-duration:500ms;
  `
export const CloseWrapper = styled.div `
  position:absolute;
  right:5px;
  top:5px;
`