import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  withStyles,
  createStyles,
  TextField,
  InputAdornment,
  IconButton
} from "@material-ui/core";
import LockRounded from "react-icons/lib/io/ios-locked";
import MailOutlineRounded from "react-icons/lib/io/ios-email";
import Visibility from "react-icons/lib/io/eye";
import VisibilityOff from "react-icons/lib/io/eye-disabled";
import PersonOutlineOutlined from "react-icons/lib/io/ios-person";
import httpService from "../../utils/httpService/httpService";

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

class Login extends React.Component {
  state = {
    email: "",
    name: "",
    password: "",
    showPassword: false,
    nameErrors: [],
    emailErrors: [],
    passwordErrors: []
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const dataToSend = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    httpService
      .post("signup", dataToSend)
      .then(data => this.props.close())
      .catch(({ data }) => {
        let emailErrors = [],
          nameErrors = [],
          passwordErrors = [];
        data.forEach(err => {
          if (err.toLowerCase().includes("email")) {
            emailErrors.push(err);
          }
          if (err.toLowerCase().includes("name")) {
            nameErrors.push(err);
          }
          if (err.toLowerCase().includes("password")) {
            passwordErrors.push(err);
          }
        });
        this.setState({ emailErrors, nameErrors, passwordErrors });
      });
  };

  render() {
    const { open, classes } = this.props;
    const {
      name,
      email,
      password,
      showPassword,
      nameErrors,
      emailErrors,
      passwordErrors
    } = this.state;
    return (
      <div>
        <Dialog className={classes.main} open={open} onClose={this.props.close}>
          <DialogTitle>Join Us!</DialogTitle>
          <DialogContentText>
            Sign up to start using this Social Network.
          </DialogContentText>
          <form onSubmit={this.handleSubmit}>
            <DialogContent className={classes.content}>
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Name"
                name="name"
                error={nameErrors.length > 0}
                helperText={nameErrors.join(", ")}
                onChange={this.handleChange}
                value={name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineOutlined className="middleIcon" />
                    </InputAdornment>
                  )
                }}
              />
              <TextField
                className={classes.textField}
                variant="outlined"
                label="Email"
                error={emailErrors.length > 0}
                helperText={emailErrors.join(", ")}
                name="email"
                value={email}
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
                error={passwordErrors.length > 0}
                helperText={passwordErrors.join(", ")}
                onChange={this.handleChange}
                type={showPassword ? "text" : "password"}
                name="password"
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
                <span className="whiteText">Sign up</span>
              </Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
