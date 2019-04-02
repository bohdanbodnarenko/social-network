import React, { Component, Fragment } from "react";
import MainRouter from "./MainRouter";
import TopBar from "./components/TopBar/TopBar";
import lightBlue from "@material-ui/core/colors/lightBlue";
import amber from "@material-ui/core/colors/amber";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { setupInterceptors } from "./utils/httpService/httpService";
import { createBrowserHistory } from "history";
import store from "./store/store";

const theme = createMuiTheme({
  palette: {
    primary: lightBlue,
    secondary: amber
  },
  typography: {
    useNextVariants: true
  }
});

export const history = createBrowserHistory();
class App extends Component {
  render() {
    setupInterceptors(store, history);
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <TopBar />
          <MainRouter />
        </MuiThemeProvider>{" "}
      </Fragment>
    );
  }
}

export default App;
