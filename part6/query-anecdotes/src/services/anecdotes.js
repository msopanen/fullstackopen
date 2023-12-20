import axios from "axios";

const baseUrl = "http://localhost:3001";

const getAnecdotes = () =>
  axios.get(`${baseUrl}/anecdotes`).then((res) => res.data);

export default { getAnecdotes };
