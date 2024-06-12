/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// Библиотеки
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { updateArticle } from "../../service/service";
// Утилиты
import { validateAndTrimData } from "../../utilities/utilities";
// Стили
import cl from "../../components/ArticleForm/ArticleForm.module.scss";
import ArticleForm from "../../components/ArticleForm/ArticleForm";

function PageEditArticle() {
  const nav = useNavigate();
  const { jwt } = useSelector((state) => state.user);
  const { slug } = useParams();
  const { articles } = useSelector((state) => state.articles);

  // Найдите нужную статью
  const foundArticle = articles.find((art) => art.slug === slug);

  // Деструктуризация свойств статьи
  const { title, description, body } = foundArticle;

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const articleData = validateAndTrimData(data);
      await updateArticle(articleData, jwt, slug);
      message.info("Article added");
      setTimeout(() => reset(), 1000);
      nav("/blog/");
    } catch (error) {
      console.error("Error creating article:", error);
      message.error("Failed to add article");
    }
  };

  return (
    <div className={cl["page-create-article__container"]}>
      <h2>Edit article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ArticleForm
          register={register}
          control={control}
          errors={errors}
          title={title}
          description={description}
          body={body}
        />
      </form>
    </div>
  );
}

export default PageEditArticle;
