/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
// Библиотеки
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { message } from "antd";
// Утилиты
import { loginUser, setAuth } from "../../store/slices/userSlice";
// Стили
import cl from "./SignInForm.module.scss";

function SignInForm() {
  const dispatch = useDispatch();
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { jwt } = useSelector((state) => state.user);
  useEffect(() => {}, [jwt]);

  const onSubmit = async (data) => {
    try {
      const loginAction = await dispatch(loginUser(data));
      if (loginAction.payload && loginAction.payload.token) {
        const { token, username, email, image } = loginAction.payload;
        // Сохранение данных в localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("image", image);

        // Обновление состояния Redux
        dispatch(setAuth({ token, username, email, image }));

        // Перенаправление пользователя
        message.success("Вы успешно вошли");
        nav("/blog/");
      } else {
        // Ошибка входа
        message.error("Ошибка входа. Проверьте правильность введенных данных");
      }
    } catch (error) {
      // Обработка других ошибок
      console.error("Error during login: ", error);
      message.error("Произошла ошибка. Попробуйте позже.");
    }
  };

  return (
    <div className={cl["sign-up-form__container"]}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email Field */}
        <label htmlFor="email" className={cl["sign-up-form__email"]}>
          Email address
          <input
            className={cl["sign-up-form__input inp-error"]}
            type="email"
            id="email"
            placeholder="Электронная почта"
            {...register("email", {
              required: "Email is required",
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
              required: "Password is required",
            })}
            autoComplete="off"
          />
          {errors.password && (
            <span className={cl["sign-up-form__error"]}>
              {errors.password.message}
            </span>
          )}
        </label>

        <button type="submit">Login</button>

        <p className={cl["sign-up-form__already"]}>
          Don’t have an account? <Link to="/blog/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
}

export default SignInForm;
