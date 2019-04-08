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
import openSocket from "socket.io-client";

// const socket = openSocket("http://localhost:8080");
export const history = createBrowserHistory();
class App extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log(history);
  }

  render() {
    // socket.on("like", data => console.log(data));
    // socket.emit("like", "some data");
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
