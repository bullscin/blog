import { createAsyncThunk } from '@reduxjs/toolkit';

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
  async ({ rejectWithValue }, page = 1) => {
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

export { fetchAllArticles, fetchArticle, handleFetchError };
