/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Spin, Popconfirm, message } from "antd";
// Утилиты
import { shortenDescription, formattedDate } from "../../utilities/utilities";
// Сервер
import {
  fetchArticle,
  deleteArticle,
  likeArticle,
  unlikeArticle,
} from "../../service/service";
// Картинки
import notLike from "../../icon/notLike.svg";
import like from "../../icon/like.svg";
// Стили
import cl from "./PageArticle.module.scss";

function PageArticle() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { jwt, username } = useSelector((state) => state.user);

  const { article, loading, error } = useSelector((state) => state.pageArticle);
  const {
    title,
    description,
    author,
    favorited,
    createdAt,
    tagList,
    favoritesCount,
    body,
  } = article || {};

  const [favoriteBool, setFavoriteBool] = useState(favorited);
  const [countLike, setCountLike] = useState(favoritesCount);

  useEffect(() => {
    dispatch(fetchArticle(slug, jwt));
  }, [dispatch, slug, jwt]);

  useEffect(() => {
    if (article) {
      setFavoriteBool(favorited);
      setCountLike(favoritesCount);
    }
  }, [article, favorited, favoritesCount]);

  const handleLike = async () => {
    if (favoriteBool) {
      try {
        await unlikeArticle(jwt, slug);
        setFavoriteBool(false);
        setCountLike(countLike - 1);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await likeArticle(jwt, slug);
        setFavoriteBool(true);
        setCountLike(countLike + 1);
      } catch (error) {
        console.error(error);
      }
    }
  };

  async function handleDelete() {
    try {
      await deleteArticle(slug, jwt);
      message.info("Статья удалена");
      setTimeout(() => nav("/blog"), 1000);
    } catch (error) {
      console.error("Error deleting article:", error);
      message.error("Ошибка при удаление статьи");
    }
  }

  function cancel() {
    message.error("Отмена");
  }
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
            <h2>{title && shortenDescription(title, 40)}</h2>
            <div className={cl.article__like}>
              <img
                className={cl["article__like-icon"]}
                src={favoriteBool ? like : notLike}
                alt="likes"
                onClick={handleLike}
              />
              <span>{countLike}</span>
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
          <div className={cl["avatar--wrapper"]}>
            <span className={cl["article__avatar-container"]}>
              <span className={cl.article__name}>{author.username}</span>
              <span className={cl.article__date}>
                {formattedDate(createdAt)}
              </span>
            </span>
            <img src={author.image} alt="avatar" />
          </div>
          {/* удаление и редактирование статьи */}

          {author.username === username ? (
            <div className={cl["btns--wrapper"]}>
              <Popconfirm
                title="Вы уверены, что хотите удалить?"
                onConfirm={handleDelete} // eslint-disable-line
                onCancel={cancel} // eslint-disable-line
                okText="ДА"
                cancelText="НЕТ"
                placement="bottom"
              >
                <button type="button" className={cl["btn-del"]}>
                  DELETE
                </button>
              </Popconfirm>
              <Link to={`/blog/articles/${slug}/edit`}>
                <button type="button" className={cl["btn-edit"]}>
                  EDIT
                </button>
              </Link>
            </div>
          ) : null}
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
