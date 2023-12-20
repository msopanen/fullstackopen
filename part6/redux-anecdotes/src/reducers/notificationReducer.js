import { createSlice } from "@reduxjs/toolkit";
//import { addAnecdote, voteAnecdote } from "./anecdoteReducer";

const initialState = "";

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
  // NOTE: Execrice 6.13 and 6.19 could be also implemented
  // using extra reducers that are listening anecdoteReducer
  // changes. I'm leving this example here for my self!!!
  /*extraReducers: (builder) => {
    function showVoteNotification(state, action) {
      return `You voted '${action.payload.content}'`;
    }
    function showAddNotification(state, action) {
      return `You added '${action.payload}'`;
    }
    builder
      .addCase(voteAnecdote, showVoteNotification)
      .addCase(addAnecdote, showAddNotification);
  },*/
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
