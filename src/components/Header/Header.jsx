// Библиотеки
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// Store-slices
import { setAuth } from "../../store/slices/userSlice";
// Стили
import cl from "./Header.module.scss";

export default function Header() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { jwt, username } = useSelector((state) => state.user);

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("image");
    dispatch(setAuth({ token: "", username: "", email: "", image: "" }));
    nav("/sign-in");
  };

  return (
    <header className={cl.header}>
      <h2>
        <Link to="/blog/articles">RealWorld Blog</Link>
      </h2>

      <div className={cl["header-btns"]}>
        {jwt ? (
          <>
            <Link to="/new-article">
              <button type="button" className={cl["btn-create"]}>
                create article
              </button>
            </Link>
            <Link to="/profile">
              <span className={cl.name}>{username}</span>
            </Link>
            <Link to="/profile">
              <img
                style={{ width: "46px", height: "46px", borderRadius: "50%" }}
                src="https://static.productionready.io/images/smiley-cyrus.jpg"
                alt="myPhoto"
              />
            </Link>
            <button
              type="button"
              className={cl["btn-out"]}
              onClick={handleLogOut}
            >
              Log out
            </button>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}
