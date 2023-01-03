import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import ContextProvider from "./context/ContextProvider";
import "bootstrap/dist/css/bootstrap.css";
import "remixicon/fonts/remixicon.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
ReactDOM.render(
  <ContextProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </ContextProvider>,
  document.getElementById("root")
);
