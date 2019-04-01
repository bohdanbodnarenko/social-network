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
