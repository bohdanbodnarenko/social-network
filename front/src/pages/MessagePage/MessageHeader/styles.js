import { fade } from "@material-ui/core/styles/colorManipulator";
import { colors } from "../../../theme";

export const styles = theme => ({
  root: {
    width: "100%",
    borderRadius: 4,
    backgroundColor: colors.darkGrey,
    zIndex: 2
  },
  grow: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  text: {
    margin: "auto"
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: theme.spacing.unit,
    width: "auto"
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    alignItems: "center",
    justifyContent: "center",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "flex"
    }
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: 120,
    "&:focus": {
      width: 200
    }
  },
  textContainer: {
    padding: "0 8px"
  }
});
