/* eslint-disable no-param-reassign */
// Библиотеки
import { createSlice } from '@reduxjs/toolkit';
import { fetchArticle } from '../../service/service';

const pageArticleSlice = createSlice({
  name: 'articles',
  initialState: {
    article: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.article = null;
      })
      .addCase(fetchArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.article = action.payload.article;
      })
      .addCase(fetchArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default pageArticleSlice.reducer;
