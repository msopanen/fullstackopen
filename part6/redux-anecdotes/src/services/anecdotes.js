import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

// get all anecdotes
// -------------------------------------------------
const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// create new anecdote
// -------------------------------------------------
const createNew = async (anecdote) => {
  const object = asObject(anecdote);
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

// vote anecdote
// -------------------------------------------------
const asVoted = (andecdote) => {
  return {
    ...andecdote,
    votes: andecdote.votes + 1,
  };
};

const vote = async (andecdote) => {
  const object = asVoted(andecdote);
  const response = await axios.put(`${baseUrl}/${andecdote.id}`, object);
  return response.data;
};

export default { getAll, createNew, vote };
