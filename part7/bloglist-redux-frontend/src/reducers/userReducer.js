import { createSlice } from "@reduxjs/toolkit";
import usersService from "../services/users";
import { setNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
  },
});

export const initUser = (id) => {
  return async (dispatch) => {
    try {
      const user = await usersService.getUser(id);
      dispatch(setUser(user));
    } catch (error) {
      console.log("ERRORII", { error });
      dispatch(
        setNotification({
          message: `could not load user: ${error.message}`,
          error: true,
        }),
      );
    }
  };
};

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
