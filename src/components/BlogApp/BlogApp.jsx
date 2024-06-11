import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Компоненты
import MainLayout from "../MainLayout/MainLayout";
import ListArticles from "../ListArticles/ListArticles";
import PageArticle from "../../pages/PageArticle/PageArticle";
import SignInForm from "../../pages/SignInForm/SignInForm";
import SignUpForm from "../../pages/SignUpForm/SignUpForm";
import PageProfile from "../../pages/PageProfile/PageProfile";
import PageCreateArticle from "../../pages/PageCreateArticle/PageCreateArticle";
import PageEditArticle from "../../pages/PageEditArticle/PageEditArticle";

export default function BlogApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/blog" element={<MainLayout />}>
          {/* Страница со списоком постов-главная и страница поста */}
          <Route index element={<ListArticles />} />
          <Route path="blog/articles" element={<ListArticles />} />
          <Route path="articles/:slug" element={<PageArticle />} />

          <Route path="articles" element={<ListArticles />} />
          <Route path="articles/:slug" element={<PageArticle />} />
          {/* Страницы редактивания поста */}
          <Route path="articles/:slug/edit" element={<PageEditArticle />} />

          {/* Страницы входа и регистрации */}
          <Route path="sign-in" element={<SignInForm />} />
          <Route path="sign-up" element={<SignUpForm />} />

          {/* Страница редактивания профиля */}
          <Route path="profile" element={<PageProfile />} />

          {/* Страница создания поста */}
          <Route path="new-article" element={<PageCreateArticle />} />

          {/* Если страница не найдена */}
          <Route path="*" element={<h2>Страница не найдена.</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
