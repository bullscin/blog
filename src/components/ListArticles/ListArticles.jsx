/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
// Библиотеки
import React, { useEffect, useState } from "react";
import { Alert, Spin, Pagination } from "antd";
import { useDispatch, useSelector } from "react-redux";
// Сервер
import { fetchAllArticles, fetchUserData } from "../../service/service";
// Компоненты
import Article from "../Article/Article";
// Стили
import cl from "./ListArticles.module.scss";

export default function ListArticles() {
  const dispatch = useDispatch();
  const { articles, loading, error, total } = useSelector(
    (state) => state.articles,
  );

  const { jwt, username } = useSelector((state) => state.user);

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(fetchAllArticles({ page: currentPage }, jwt));
  }, [dispatch, currentPage, jwt]);

  useEffect(() => {
    // Вызываем  только если пользователь аутентифицирован
    if (jwt && !username) {
      dispatch(fetchUserData());
    }
  }, [dispatch, jwt, username]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading && articles.length === 0) {
    return (
      <div>
        <Alert
          message="Загрузка постов..."
          type="info"
          showIcon
          style={{ marginBottom: "26px", textAlign: "center" }}
        />
        <Spin
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <Alert
        style={{ marginBottom: "20px" }}
        type="error"
        description={error}
      />
    );
  }

  return (
    <>
      <ul>
        {articles.map((article) => (
          <Article key={article.id} article={article} />
        ))}
      </ul>
      <Pagination
        className={cl["ant-pagination"]}
        current={currentPage} // Текущая страница
        total={total} // Общее количество элементов
        pageSize={10} // Количество элементов на странице
        onChange={handlePageChange} // Обработчик изменения страницы
      />
    </>
  );
}
