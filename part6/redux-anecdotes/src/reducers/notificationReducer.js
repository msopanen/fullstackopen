import { createSlice } from "@reduxjs/toolkit";

const initialState = "Notification";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload;
    },
  },
});

export const { setFilter } = notificationSlice.actions;
export default notificationSlice.reducer;
