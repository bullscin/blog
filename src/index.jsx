// Библиотеки
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// Корневой компонент
import BlogApp from "./components/BlogApp/BlogApp";
// Store
import store from "./store/store";

const container = document.getElementById("root");
const rootInstance = createRoot(container);

rootInstance.render(
  <Provider store={store}>
    <BlogApp />
  </Provider>,
);
