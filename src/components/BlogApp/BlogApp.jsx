// Библиотеки
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Компоненты
import MainLayout from "../MainLayout/MainLayout";
import ListArticles from "../ListArticles/ListArticles";
import PageArticle from "../../pages/PageArticle";

export default function BlogApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Страница со списоком постов и страница поста */}
          <Route index element={<ListArticles />} />
          <Route path="articles" element={<ListArticles />} />
          <Route path="articles/:slug" element={<PageArticle />} />

          {/* Если страница не найдена */}
          <Route path="*" element={<h2>Страница не найдена.</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
