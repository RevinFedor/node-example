import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, user: null },
  reducers: {
    setCredentials: (state, action) => {
      const accessToken = action.payload;
      const {username} = jwt_decode(accessToken,"token");
      localStorage.setItem("token", accessToken);
      state.token = accessToken;
      state.user = username;
    },
    logOut: (state, action) => {
      localStorage.removeItem("token");
      state.user = null
      state.token = null;
    },
  },
});

// функции
export const { setCredentials, logOut } = authSlice.actions;

// получить текущий токен
export const selectCurrentToken = (state) => state.auth.token;

export const selectCurrentUser = (state) => state.auth.user;


export default authSlice.reducer;
