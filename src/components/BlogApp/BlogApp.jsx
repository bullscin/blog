// Библиотеки
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Компоненты
import MainLayout from "../MainLayout/MainLayout";
import ListArticles from "../ListArticles/ListArticles";
import PageArticle from "../../pages/PageArticle/PageArticle";
import SignInForm from "../../pages/SignInForm/SignInForm";
import SignUpForm from "../../pages/SignUpForm/SignUpForm";
import PageProfile from "../../pages/PageProfile/PageProfile";

export default function BlogApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Страница со списоком постов-главная и страница поста */}
          <Route index element={<ListArticles />} />
          <Route path="blog" element={<ListArticles />} />
          <Route path="blog/articles/:slug" element={<PageArticle />} />

          {/* Страницы входа и регистрации */}
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />

          {/* Страница редактиварония профиля */}
          <Route path="profile" element={<PageProfile />} />

          {/* Страница создания поста */}
          {/* <Route path="new-article" element={<авымыв />} /> */}

          {/* Страницы редактиварония поста и профиля */}
          {/* <Route path="articles/:slug/edit" element={<фысыфссысы />} /> */}

          {/* Если страница не найдена */}
          <Route path="*" element={<h2>Страница не найдена.</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
