import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import store from "./redux/store";
import ContextProvider from "./context/ContextProvider";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { light } from "./Effect/styles/Themes";
ReactDOM.render(
  <ContextProvider>
    <Provider store={store}>
      <ThemeProvider theme={light}>
        <App />
        </ThemeProvider>
    </Provider>
  </ContextProvider>,
  document.getElementById("root")
);
