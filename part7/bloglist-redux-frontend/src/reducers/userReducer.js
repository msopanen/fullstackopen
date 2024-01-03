import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser() {
      return null;
    },
  },
});

export const USER_VAULT = "fi.fullstackopen.user";

// Init
// -----------------------------
const getStoredUser = () => {
  const stored = window.localStorage.getItem(USER_VAULT);
  return JSON.parse(stored) || null;
};

export const initUser = () => {
  return async (dispatch) => {
    const user = getStoredUser();
    dispatch(setUser(user));
  };
};

// Login
// -----------------------------
const setStoredUser = (user) => {
  window.localStorage.setItem(USER_VAULT, JSON.stringify(user));
};

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });

      setStoredUser(user);

      dispatch(setUser(user));
    } catch (error) {
      dispatch(
        setNotification({
          message: "wrong username or password",
          error: true,
        }),
      );
    }
  };
};

// Logout
// -----------------------------
const removeStoredUser = () => {
  window.localStorage.removeItem(USER_VAULT);
};

export const logout = () => {
  return async (dispatch) => {
    removeStoredUser();
    dispatch(clearUser());
  };
};

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
