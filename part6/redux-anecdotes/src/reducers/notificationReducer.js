import { createSlice } from "@reduxjs/toolkit";

const initialState = { text: "notification" };

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setFilter(state, action) {
      state.text = action.payload;
    },
  },
});

export const { setFilter } = notificationSlice.actions;
export default notificationSlice.reducer;
