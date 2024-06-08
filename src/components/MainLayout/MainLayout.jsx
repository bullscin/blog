// Библиотеки
import React from "react";
import { Outlet } from "react-router-dom";
// Компоненты
import Header from "../Header/Header";
// Стили
import "../../default-style/style.module.scss";
import cl from "./MainLayout.module.scss";

export default function MainLayout() {
  return (
    <div className={cl.container}>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
