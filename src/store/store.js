import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from './slices/articlesSlice';
import pageArticleReducer from './slices/pageArticleSlice';

// Создание Redux Store и добавление редюсера для управления состоянием
const store = configureStore({
  reducer: {
    articles: articlesReducer,
    pageArticle: pageArticleReducer,
  },
});

export default store; // Экспорт store для использования в приложении
