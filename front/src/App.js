import React, { Component, Fragment } from "react";
import MainRouter from "./MainRouter";
import TopBar from "./components/TopBar/TopBar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { setupInterceptors } from "./utils/httpService/httpService";
import { createBrowserHistory } from "history";
import store from "./store/store";
import TopShape from "./UI/Shapes/TopShape";
import BottomShape from "./UI/Shapes/BottomShape";
import { theme } from "./theme";
import socket from "./utils/sockets";
export const history = createBrowserHistory();
class App extends Component {
  componentWillMount() {
    socket.on("connected", data => console.log(data));
    setupInterceptors(store, history);
  }

  render() {
    return (
      <Fragment>
        <MuiThemeProvider theme={theme}>
          <TopBar />
          <TopShape />
          <BottomShape />
          <MainRouter />
        </MuiThemeProvider>{" "}
      </Fragment>
    );
  }
}

export default App;
