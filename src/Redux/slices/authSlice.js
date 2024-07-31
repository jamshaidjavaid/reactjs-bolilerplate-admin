import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  tokenExpiry: null,
  refreshTokenExpiry: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      const { user, token, refreshToken, tokenExpiry, refreshTokenExpiry } =
        action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.tokenExpiry = tokenExpiry;
      state.refreshTokenExpiry = refreshTokenExpiry;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.tokenExpiry = null;
      state.refreshTokenExpiry = null;
      state.isLoggedIn = false;
    },
    updateToken(state, action) {
      state.token = action.payload.token;
      state.tokenExpiry = action.payload.tokenExpiry;
      state.refreshToken = action.payload.refreshToken;
      state.refreshTokenExpiry = action.payload.refreshTokenExpiry;
    },
  },
});

export const { login, logout, updateToken } = authSlice.actions;

export default authSlice.reducer;
