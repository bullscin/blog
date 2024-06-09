/* eslint-disable no-console */
/* eslint-disable default-param-last */
// Библиотеки
import { createAsyncThunk } from '@reduxjs/toolkit';
// Базовый url
const BASE_URL = 'https://blog.kata.academy/api/';

const handleFetchError = (error) => {
  if (error.message === 'Failed to fetch')
    return new Error(
      'Не удалось загрузить данные. Проверьте подключение к интернету и повторите попытку.',
    );

  if (error.response) {
    const { status } = error.response;
    if (status === 404)
      return new Error(
        'Данные не найдены. Проверьте правильность введенных данных.',
      );

    if (status >= 500)
      return new Error('Ошибка сервера. Попробуйте повторить запрос позже.');
  }
  return new Error('Произошла неизвестная ошибка.');
};

// Функция для запроса на получения всех постов
const fetchAllArticles = createAsyncThunk(
  'articles/fetchAllArticles',
  async (page = 1, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}articles?limit=10&offset=${(page - 1) * 10}`,
      );
      const data = await response.json();
      return { articles: data.articles, total: data.articlesCount };
    } catch (error) {
      const customError = handleFetchError(error);
      return rejectWithValue(customError.message);
    }
  },
);

// Функция для запроса на получения конкретного поста
const fetchArticle = createAsyncThunk(
  'articles/fetchArticle',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}articles/${slug}`);
      const data = await response.json();
      return data;
    } catch (error) {
      const customError = handleFetchError(error);
      return rejectWithValue(customError.message);
    }
  },
);

// Функция для регистрации (POST запрос)
const registerUserService = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { ...user } }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    throw new Error('Failed to create account');
  }
};

// Функция для входа в аккаунт (POST запрос)
const loginUserService = async (user) => {
  try {
    const response = await fetch(`${BASE_URL}users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user }),
    });

    const data = await response.json();
    if (!data.user || !data.user.token) {
      throw new Error('Invalid response format');
    }

    localStorage.setItem('token', data.user.token);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('email', data.user.email);
    localStorage.setItem('image', data.user.image);

    return data.user;
  } catch (error) {
    const customError = handleFetchError(error);
    throw customError;
  }
};

// Функция для запроса обновления профиля  (PUT запрос)
const updateUserProfile = async (data, jwt) => {
  try {
    const response = await fetch(`${BASE_URL}user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
      body: JSON.stringify({ user: { ...data } }),
    });

    return await response.json();
  } catch (error) {
    const customError = handleFetchError(error);
    throw customError;
  }
};

export {
  fetchAllArticles,
  fetchArticle,
  handleFetchError,
  loginUserService,
  registerUserService,
  updateUserProfile,
};
