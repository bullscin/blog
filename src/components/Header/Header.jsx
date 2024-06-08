// Библиотеки
import React from "react";
import { Link } from "react-router-dom";
// Стили
import cl from "./Header.module.scss";

export default function Header() {
  return (
    <header className={cl.header}>
      <h2>
        <Link to="/">RealWorld Blog</Link>
      </h2>

      <div className={cl["header-btns"]}>
        <Link to="sign-in">
          <button type="button" className={cl["btn-in"]}>
            Sign In
          </button>
        </Link>

        <Link to="/sign-up">
          <button type="button" className={cl["btn-up"]}>
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
}
