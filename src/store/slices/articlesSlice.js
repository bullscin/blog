/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { fetchAllArticles } from '../../service/service';

let idCounter = 0;

function generateUniqueId() {
  idCounter += 1;
  return idCounter;
}

const articlesSlice = createSlice({
  name: 'articles',
  initialState: { articles: [], loading: false, error: null, total: 0 },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles.map((article) => ({
          ...article,
          id: generateUniqueId(),
        }));
        state.total = action.payload.total;
      })
      .addCase(fetchAllArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default articlesSlice.reducer;
