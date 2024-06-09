// Библиотеки
import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
// Утилиты
import { shortenDescription, formattedDate } from "../../utilities/utilities";
// Картинки
import notLike from "../../icon/notLike.svg";
import like from "../../icon/like.svg";
// Стили
import cl from "./Article.module.scss";

let idCounter = 0;

function generateUniqueId() {
  idCounter += 1;
  return idCounter;
}
function Article({ article }) {
  const {
    title,
    description,
    author,
    favorited,
    createdAt,
    tagList,
    favoritesCount,
    slug,
  } = article;

  return (
    <li className={cl.article}>
      <div className={cl.article__header}>
        <div className={cl.article__title}>
          <div className={cl["article__title-top"]}>
            <h2>
              <Link to={`blog/articles/${slug}`}>
                {shortenDescription(title, 40)}
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
            {tagList.map((tag) => {
              if (tag && typeof tag === "string") {
                const trimmedTag = tag.trim();
                if (trimmedTag !== "") {
                  return (
                    <li className={cl.article__tag} key={generateUniqueId()}>
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
        {shortenDescription(description, 200)}
      </p>
    </li>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    author: PropTypes.shape({
      username: PropTypes.string,
      image: PropTypes.string,
    }),
    favorited: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    tagList: PropTypes.arrayOf(PropTypes.string),
    favoritesCount: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
  }).isRequired,
};

export default Article;
