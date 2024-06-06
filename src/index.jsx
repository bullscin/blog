import React from "react";
import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
import BlogApp from "./components/BlogApp/BlogApp";
// import store from "./store/store";

const container = document.getElementById("root");
const rootInstance = createRoot(container);

rootInstance.render(
  // <Provider store={store}>
  <BlogApp />,
  // </Provider>,
);
