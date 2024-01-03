import axios from "axios";
import { USER_VAULT } from "../utils/useUser";
const baseUrl = "/api/blogs";

const getToken = () => {
  const stored = window.localStorage.getItem(USER_VAULT);
  return JSON.parse(stored || "{}")["token"];
};

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const createBlog = async (blog) => {
  const { data } = await axios.post(baseUrl, blog, {
    headers: {
      Authorization: `bearer ${getToken()}`,
    },
  });
  return data;
};

const updateBlog = async (id, blog) => {
  const { data } = await axios.put(`${baseUrl}/${id}`, blog, {
    headers: {
      Authorization: `bearer ${getToken()}`,
    },
  });
  return data;
};

const deleteBlog = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/${id}`, {
    headers: {
      Authorization: `bearer ${getToken()}`,
    },
  });
  return data;
};

export default { getAll, createBlog, updateBlog, deleteBlog };
