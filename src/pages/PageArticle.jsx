/* eslint-disable no-shadow */
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Spin } from "antd";
// Утилиты
import { shortenDescription, formattedDate } from "../utilities/utilities";
// Сервер
import { fetchArticle } from "../service/service";
// Картинки
import notLike from "../icon/notLike.svg";
import like from "../icon/like.svg";
// Стили
import cl from "./PageArticle.module.scss";

function PageArticle() {
  const dispatch = useDispatch();
  const { slug } = useParams();

  const { article, loading, error } = useSelector((state) => state.pageArticle);
  const {
    title,
    description,
    author,
    createdAt,
    tagList,
    body,
    favorited,
    favoritesCount,
  } = article || {};

  useEffect(() => {
    dispatch(fetchArticle(slug));
  }, [slug]);

  if (loading && !article) {
    return (
      <div>
        <Alert
          message="Загрузка поста..."
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

  if (!article)
    return (
      <div>
        <Alert
          message="Статья не найдена"
          type="info"
          showIcon
          style={{ marginBottom: "26px", textAlign: "center" }}
        />
        .
      </div>
    );

  return (
    <article className={cl.article}>
      <div className={cl.article__header}>
        <div className={cl.article__title}>
          <div className={cl["article__title-top"]}>
            <h2>
              <Link to={`/articles/${slug}`}>
                {title && shortenDescription(title, 40)}
              </Link>
            </h2>
            <div className={cl.article__like}>
              <img
                className={cl["article__like-icon"]}
                src={favorited ? like : notLike}
                alt="likes"
              />
              <span>{favoritesCount}</span>
            </div>
          </div>

          <ul className={cl["article__tag-list"]}>
            {tagList &&
              tagList.map((tag) => {
                if (tag && typeof tag === "string") {
                  const trimmedTag = tag.trim();
                  if (trimmedTag !== "") {
                    return (
                      <li key={tag} className={cl.article__tag}>
                        {shortenDescription(trimmedTag, 12)}
                      </li>
                    );
                  }
                }
                return null;
              })}
          </ul>
        </div>

        <div className={cl.article__avatar}>
          <span className={cl["article__avatar-container"]}>
            <span className={cl.article__name}>{author.username}</span>
            <span className={cl.article__date}>{formattedDate(createdAt)}</span>
          </span>
          <img src={author.image} alt="avatar" />
        </div>
      </div>

      <p className={cl.article__description}>
        {description && shortenDescription(description, 200)}
      </p>
      <ReactMarkdown>{body}</ReactMarkdown>
    </article>
  );
}

export default PageArticle;
