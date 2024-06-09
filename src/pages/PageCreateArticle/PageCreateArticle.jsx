/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// Библиотеки
import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
import { postArticle } from "../../service/service";
// Утилиты
import {
  validationMethods,
  validateAndTrimData,
} from "../../utilities/utilities";
// Стили
import cl from "./PageCreateArticle.module.scss";

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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const addTag = () => {
    append({ tag: "" });
  };

  const deleteTag = (index) => {
    remove(index);
  };

  const onSubmit = async (data) => {
    try {
      const articleData = validateAndTrimData(data);
      await postArticle(articleData, jwt);
      message.info("Article added");
      setTimeout(() => reset(), 1000);
      nav("/");
    } catch (error) {
      console.error("Error creating article:", error);
      message.error("Failed to add article");
    }
  };

  return (
    <div className={cl["page-create-article__container"]}>
      <h2>Create new article</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Title Field */}
        <label htmlFor="title">
          Title
          <input
            className={cl.input}
            id="title"
            type="text"
            placeholder="Title"
            {...register("title", {
              validate: (value) => validationMethods.validateTitle(value),
            })}
          />
          {errors.title && (
            <span className={cl["page-create-article__error"]}>
              {errors.title.message}
            </span>
          )}
        </label>

        {/* Short description Field */}
        <label htmlFor="description">
          Short description
          <input
            className={cl.input}
            id="description"
            type="text"
            placeholder="Short description"
            {...register("description", {
              validate: (value) => validationMethods.validateDescription(value),
            })}
          />
          {errors.description && (
            <span className={cl["page-create-article__error"]}>
              {errors.description.message}
            </span>
          )}
        </label>

        {/* Text Field */}
        <label htmlFor="body">
          Text
          <textarea
            className={cl["input-textarea"]}
            name="text"
            id="body"
            cols="30"
            rows="10"
            placeholder="Text"
            {...register("body", {
              validate: (value) => validationMethods.validateBody(value),
            })}
          />
          {errors.body && (
            <span className={cl["page-create-article__error"]}>
              {errors.body.message}
            </span>
          )}
        </label>

        {/* Tags Field */}
        <label htmlFor="tag">
          Tags
          <div className={cl.tags}>
            {fields.map((tag, index) => (
              <div key={tag.id}>
                <input
                  id="tag"
                  className={cl.tag}
                  type="text"
                  placeholder="Tag"
                  {...register(`tags.${index}.tag`, { required: true })}
                  defaultValue={tag.tag}
                />

                <button
                  type="button"
                  className={cl.del}
                  onClick={() => deleteTag(index)}
                >
                  DELETE
                </button>
              </div>
            ))}
            <button type="button" className={cl.add} onClick={addTag}>
              ADD TAG
            </button>
          </div>
        </label>

        <button type="submit" className={cl.send}>
          Send
        </button>
      </form>
    </div>
  );
}

export default PageCreateArticle;
