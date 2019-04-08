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
import io from "socket.io-client";

export const history = createBrowserHistory();
const socket = io.connect('ws://localhost:8080');
socket.on("hello", data => console.log(data));
class App extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log(history);
  }

  render() {
    setupInterceptors(store, history);
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
