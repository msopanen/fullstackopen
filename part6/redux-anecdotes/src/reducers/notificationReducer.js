import { createSlice } from "@reduxjs/toolkit";
import { addAnecdote, voteAnecdote } from "./anecdoteReducer";

const initialState = "";

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    hideNotification() {
      return "";
    },
  },
  extraReducers: (builder) => {
    function showVoteNotification(state, action) {
      return `You voted '${action.payload.content}'`;
    }
    function showAddNotification(state, action) {
      return `You added '${action.payload}'`;
    }
    builder
      .addCase(voteAnecdote, showVoteNotification)
      .addCase(addAnecdote, showAddNotification);
  },
});

export const { hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
