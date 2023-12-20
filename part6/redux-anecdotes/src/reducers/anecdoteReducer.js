import { createSlice } from "@reduxjs/toolkit";

import anecdotesService from "../services/anecdotes";

const sortFn = (a, b) => b.votes - a.votes;

const increaseVotesFn = (id) => (r) =>
  r.id === id ? { ...r, votes: r.votes + 1 } : r;

const initialState = [];

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    voteAnecdote(state, action) {
      const anecdoteId = action.payload;
      return state.map(increaseVotesFn(anecdoteId)).sort(sortFn);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const { addAnecdote, voteAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
