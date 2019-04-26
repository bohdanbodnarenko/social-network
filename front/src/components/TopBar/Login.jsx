import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";
import {
  Button,
  withStyles,
  createStyles,
  TextField,
  InputAdornment,
  IconButton,
  LinearProgress
} from "@material-ui/core";
import LockRounded from "react-icons/lib/io/ios-locked";
import MailOutlineRounded from "react-icons/lib/io/ios-email";
import Visibility from "react-icons/lib/io/eye";
import VisibilityOff from "react-icons/lib/io/eye-disabled";
import httpService from "../../utils/httpService/httpService";
import { signinSuccess } from "../../store/auth/actions";

const styles = theme =>
  createStyles({
    textField: {
      width: "100%",
      marginTop: theme.spacing.unit,
      marginBottom: theme.spacing.unit
    },
    content: {
      paddingTop: theme.spacing.unit,
      paddingBottom: theme.spacing.unit
    },
    main: {
      textAlign: "center"
    },
    button: {
      margin: theme.spacing.unit,
      width: "100%"
    }
  });

class Signup extends React.Component {
  state = {
    email: "",
    password: "",
    emailErrors: [],
    passwordErrors: [],
    showPassword: false,
    loading: false
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  handleSubmit = async event => {
    event.preventDefault();
    this.toggleLoading();
    const dataToSend = {
      email: this.state.email,
      password: this.state.password
    };

    httpService
      .post("signin", dataToSend)
      .then(({ data }) => {
        this.props.signinSuccess(data.token, data.user);
        window.localStorage.setItem("accessToken", data.token);
        window.localStorage.setItem("userData", JSON.stringify(data.user));
        this.toggleLoading();
        this.props.close();
      })
      .catch(({ data }) => {
        let emailErrors = [],
          passwordErrors = [];
        data.forEach(err => {
          if (err.toLowerCase().includes("email")) {
            emailErrors.push(err);
          }

          if (err.toLowerCase().includes("password")) {
            passwordErrors.push(err);
          }
        });
        this.setState({ emailErrors, passwordErrors });
        this.toggleLoading();
      });
  };

  render() {
    const { open, classes } = this.props;
    const {
      email,
      password,
      showPassword,
      emailErrors,
      passwordErrors,
      loading
    } = this.state;
    return (
      <div>
        <Dialog className={classes.main} open={open} onClose={this.props.close}>
          {loading && <LinearProgress />}
          <DialogTitle>Join Us!</DialogTitle>
          <DialogContentText>Sign into your account here.</DialogContentText>
          <form onSubmit={this.handleSubmit}>
            <DialogContent className={classes.content}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Email"
                name="email"
                value={email}
                error={emailErrors.length > 0}
                helperText={emailErrors.join(", ")}
                onChange={this.handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineRounded className="middleIcon" />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Password"
                onChange={this.handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
                error={passwordErrors.length > 0}
                helperText={passwordErrors.join(", ")}
                value={password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockRounded className="middleIcon" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                <span className="whiteText">Login </span>
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signinSuccess: (token, user) => dispatch(signinSuccess(token, user))
});

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(Signup));
