import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";
import { setNotification } from "./notificationReducer";
const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload;
    },
  },
});

export const initUsers = () => {
  return async (dispatch) => {
    try {
      const users = await usersService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      dispatch(
        setNotification({
          message: `could not load all users: ${error.message}`,
          error: true,
        }),
      );
    }
  };
};

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
