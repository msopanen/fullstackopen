import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const sortFn = (a, b) => b.votes - a.votes;

const increaseVotesFn = (id) => (r) =>
  r.id === id ? { ...r, votes: r.votes + 1 } : r;

const initialState = [];

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(asObject(action.payload));
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

export const { addAnecdote, voteAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
