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
  async (payload, { rejectWithValue, getState }) => {
    const { page = 1 } = payload;
    const { jwt } = getState().user;

    try {
      const response = await fetch(
        `${BASE_URL}articles?limit=10&offset=${(page - 1) * 10}`,
        {
          headers: {
            Authorization: `Token ${jwt}`,
          },
        },
      );

      const data = await response.json();
      // localStorage.setItem('articles', JSON.stringify(data.articles));
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
  async (slug, { rejectWithValue, getState }) => {
    const { jwt } = getState().user;
    try {
      const response = await fetch(`${BASE_URL}articles/${slug}`, {
        headers: {
          Authorization: `Token ${jwt}`,
        },
      });
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
    const customError = handleFetchError(error);
    return customError;
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

// Функция для запроса на создание поста (POST запрос)
const postArticle = async (data, jwt) => {
  const validData = {
    article: {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tags.map((tag) => tag.tag),
    },
  };

  try {
    const res = await fetch(`${BASE_URL}articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
      body: JSON.stringify(validData),
    });

    if (!res.ok) {
      throw new Error('Failed to add article');
    }

    const result = await res.json();
    return result;
  } catch (error) {
    const customError = handleFetchError(error);
    throw customError;
  }
};
// Функция для запроса на удаление поста (DELETE запрос)
const deleteArticle = async (slug, jwt) => {
  try {
    const response = await fetch(`${BASE_URL}articles/${slug}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete article');
    }

    return response;
  } catch (error) {
    const customError = handleFetchError(error);
    throw customError;
  }
};
// Функция для запроса обновления поста  (PUT запрос)
const updateArticle = async (data, jwt, slug) => {
  const validData = {
    article: {
      title: data.title,
      description: data.description,
      body: data.body,
      tagList: data.tags.map((tag) => tag.tag),
    },
  };

  try {
    const response = await fetch(`${BASE_URL}articles/${slug}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${jwt}`,
      },
      body: JSON.stringify(validData),
    });

    if (!response.ok) {
      throw new Error('Failed to update article');
    }

    const updatedArticle = await response.json();
    return updatedArticle;
  } catch (error) {
    const customError = handleFetchError(error);
    throw customError;
  }
};
// Функция для запроса на добавления лайка (POST запрос)
const likeArticle = async (jwt, slug) => {
  try {
    const res = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${jwt}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to add article to favorites');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    const customError = handleFetchError(error);
    throw customError;
  }
};
// Функция для запроса на удаления лайка (DELETE запрос)
const unlikeArticle = async (jwt, slug) => {
  try {
    const res = await fetch(
      `https://blog.kata.academy/api/articles/${slug}/favorite`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${jwt}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error('Failed to remove article from favorites');
    }

    const data = await res.json();
    return data;
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
  postArticle,
  deleteArticle,
  updateArticle,
  likeArticle,
  unlikeArticle,
};
