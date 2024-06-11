/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// Библиотеки
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message } from "antd";
// Утилиты
import { validationMethods } from "../../utilities/utilities";
// Сервер
import { updateUserProfile } from "../../service/service";
// Стили
import cl from "./PageProfile.module.scss";

function PageProfile() {
  const { jwt, username, email } = useSelector((state) => state.user);
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await updateUserProfile(data, jwt);
      reset();
      message.info("Профиль обновлён");
      nav("/blog/");
    } catch (error) {
      console.error("Error profile not updated:", error);
      message.error("Профиль не обновлён");
    }
  };

  return (
    <div className={cl["sign-up-form__container"]}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <label htmlFor="username" className={cl["sign-up-form__username"]}>
          Username
          <input
            className={cl["sign-up-form__input inp-error"]}
            type="text"
            id="username"
            defaultValue={username}
            placeholder="Имя пользователя"
            {...register("username", {
              validate: (value) => validationMethods.validateUsername(value),
            })}
          />
          {errors.username && (
            <span className={cl["sign-up-form__error"]}>
              {errors.username.message}
            </span>
          )}
        </label>

        {/* Email Field */}
        <label htmlFor="email" className={cl["sign-up-form__email"]}>
          Email address
          <input
            className={cl["sign-up-form__input inp-error"]}
            type="email"
            id="email"
            defaultValue={email}
            placeholder="Электронная почта"
            {...register("email", {
              validate: (value) => validationMethods.validateEmail(value),
            })}
          />
          {errors.email && (
            <span className={cl["sign-up-form__error"]}>
              {errors.email.message}
            </span>
          )}
        </label>

        {/* Password Field */}
        <label htmlFor="password" className={cl["sign-up-form__pass"]}>
          Password
          <input
            className={cl["sign-up-form__input inp-error"]}
            type="password"
            id="password"
            placeholder="Пароль"
            {...register("password", {
              validate: (value) => validationMethods.validatePassword(value),
            })}
            autoComplete="off"
          />
          {errors.password && (
            <span className={cl["sign-up-form__error"]}>
              {errors.password.message}
            </span>
          )}
        </label>

        {/* Avatar Field */}
        <label htmlFor="url" className={cl["sign-up-form__pass"]}>
          Avatar image (URL)
          <input
            className={cl["sign-up-form__input inp-error"]}
            type="url"
            id="url"
            placeholder="Avatar image URL"
            {...register("url", {
              validate: (value) => validationMethods.validateAvatar(value),
            })}
            autoComplete="off"
          />
          {errors.image && (
            <span className={cl["sign-up-form__error"]}>
              {errors.password.message}
            </span>
          )}
        </label>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default PageProfile;
