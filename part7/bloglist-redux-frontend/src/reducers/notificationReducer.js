import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  error: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification(state, action) {
      return action.payload;
    },
    hideNotification() {
      return "";
    },
  },
});

export const setNotification = (notification, time = 5000) => {
  return (dispatch) => {
    dispatch(showNotification(notification));
    setTimeout(() => dispatch(hideNotification()), time);
  };
};

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
