/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// Библиотеки
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { message } from "antd";
// Store-slices
import { registerUser } from "../../store/slices/userSlice";
// Утилиты
import { validationMethods } from "../../utilities/utilities";
// Стили
import cl from "./SignUpForm.module.scss";

function SignUpForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    await dispatch(registerUser(data))
      .then(() => {
        message.info("Вы успешно создали аккаунт");
        nav("/blog/sign-in");
      })
      .catch((error) => {
        console.error("Error during registration: ", error);
        message.error("Ошибка при регистрации.");
      });
  };

  return (
    <div className={cl["sign-up-form__container"]}>
      <h2>Create new account</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Username Field */}
        <label htmlFor="username" className={cl["sign-up-form__username"]}>
          Username
          <input
            className={cl["sign-up-form__input inp-error"]}
            type="text"
            id="username"
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

        {/* Repeat Password Field */}
        <label
          htmlFor="repeatPassword"
          className={cl["sign-up-form__repeatPassword"]}
        >
          Repeat Password
          <input
            className={cl["sign-up-form__input inp-error"]}
            type="password"
            id="repeatPassword"
            placeholder="Повторите пароль"
            {...register("repeatPassword", {
              validate: (value) =>
                validationMethods.validateRepeatPassword(value, getValues),
            })}
            autoComplete="off"
          />
          {errors.repeatPassword && (
            <span className={cl["sign-up-form__error"]}>
              {errors.repeatPassword.message}
            </span>
          )}
        </label>

        {/* Checkbox Field */}
        <label htmlFor="checkbox" className={cl["sign-up-form__check"]}>
          <br />
          <input
            type="checkbox"
            id="checkbox"
            {...register("checkbox", {
              validate: (value) => validationMethods.validateCheckbox(value),
            })}
          />
          I agree to the processing of my personal information
          {errors.checkbox && (
            <span className={cl["sign-up-form__error"]}>
              {errors.checkbox.message}
            </span>
          )}
        </label>

        <button type="submit">Create</button>

        {/* <span className="error">{errorMessage}</span> */}

        <p className={cl["sign-up-form__already"]}>
          Already have an account? <Link to="/blog/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUpForm;
