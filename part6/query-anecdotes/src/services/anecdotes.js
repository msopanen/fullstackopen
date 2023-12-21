import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

// get all anecdotes
// -------------------------------------------------
export const getAnecdotes = () =>
  axios.get(`${baseUrl}`).then((res) => res.data);

// create new anecdote
// -------------------------------------------------
export const createAnecdote = (anecdote) => {
  const object = asObject(anecdote);
  return axios.post(baseUrl, object).then((res) => res.data);
};

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};
