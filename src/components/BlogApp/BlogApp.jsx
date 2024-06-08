import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../MainLayout/MainLayout";
import ListArticles from "../ListArticles/ListArticles";
import PageArticle from "../../pages/PageArticle";

export default function BlogApp() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* Главная страница - список статей */}
          <Route index element={<ListArticles />} />
          <Route path="blog" element={<ListArticles />} />
          <Route path="blog/articles/:slug" element={<PageArticle />} />

          {/* Если страница не найдена */}
          <Route path="*" element={<h2>Страница не найдена.</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
