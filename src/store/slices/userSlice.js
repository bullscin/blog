/* eslint-disable no-param-reassign */
// Библиотеки
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { registerUserService, loginUserService } from '../../service/service';
// Определяем асинхронное действие для регистрации пользователя
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await registerUserService(userData);
      return response.user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
// Определяем асинхронное действие для входа пользователя
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await loginUserService(userData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    jwt: localStorage.getItem('token') ?? null,
    username: localStorage.getItem('username') ?? '',
    email: localStorage.getItem('email') ?? '',
    image: localStorage.getItem('image') ?? '',
    error: null,
  },
  reducers: {
    setAuth(state, action) {
      const { token: jwt, username, email, image } = action.payload;
      state.jwt = jwt;
      state.username = username;
      state.email = email;
      state.image = image;
    },
  },
  extraReducers: (builder) => {
    // Обрабатываем успешное выполнение действия регистрации
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.error = null;
      state.jwt = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.error = action.payload;
    });
    // Обрабатываем успешное выполнение действия входа
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.error = null;
      state.jwt = action.payload.token;
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.image = action.payload.image;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const { setAuth } = userSlice.actions;
export default userSlice.reducer;
