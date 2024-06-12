/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// Библиотеки
import React from "react";
import PropTypes from "prop-types";
import { useFieldArray } from "react-hook-form";
// Утилиты
import { validationMethods } from "../../utilities/utilities";
// Стили
import cl from "./ArticleForm.module.scss";

function ArticleForm({
  errors,
  register,
  control,
  title = "",
  description = "",
  body = "",
}) {
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

  return (
    <>
      {/* Title Field */}
      <label htmlFor="title">
        Title
        <input
          className={cl.input}
          id="title"
          type="text"
          placeholder="Title"
          defaultValue={title}
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
          defaultValue={description}
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
          defaultValue={body}
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
    </>
  );
}
ArticleForm.propTypes = {
  errors: PropTypes.object.isRequired,
  register: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
};

ArticleForm.defaultProps = {
  title: "",
  description: "",
  body: "",
};

export default ArticleForm;
