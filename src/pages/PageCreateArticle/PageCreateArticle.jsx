/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// Библиотеки
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { postArticle } from "../../service/service";
// Утилиты
import { validateAndTrimData } from "../../utilities/utilities";
// Стили
import cl from "../../components/ArticleForm/ArticleForm.module.scss";
import ArticleForm from "../../components/ArticleForm/ArticleForm";

function PageCreateArticle() {
  const nav = useNavigate();
  const { jwt } = useSelector((state) => state.user);

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
      await postArticle(articleData, jwt);
      message.info("Article added");
      setTimeout(() => reset(), 1000);
      nav("/blog");
    } catch (error) {
      console.error("Error creating article:", error);
      message.error("Failed to add article");
    }
  };

  return (
    <div className={cl["page-create-article__container"]}>
      <h2>Create new article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ArticleForm register={register} control={control} errors={errors} />
      </form>
    </div>
  );
}

export default PageCreateArticle;
