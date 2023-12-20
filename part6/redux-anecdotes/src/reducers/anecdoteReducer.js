import { createSlice } from "@reduxjs/toolkit";

import anecdotesService from "../services/anecdotes";

const sortFn = (a, b) => b.votes - a.votes;

const updateFn = (andecdote) => (r) =>
  r.id === andecdote.id ? { ...andecdote } : r;

const initialState = [];

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload);
    },
    updateAnecdote(state, action) {
      return state.map(updateFn(action.payload)).sort(sortFn);
    },
    setAnecdotes(state, action) {
      return action.payload.sort(sortFn);
    },
  },
});

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(anecdote);
    dispatch(addAnecdote(newAnecdote));
  };
};

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = await anecdotesService.vote(anecdote);
    dispatch(updateAnecdote(votedAnecdote));
  };
};

export const { addAnecdote, setAnecdotes, updateAnecdote } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
