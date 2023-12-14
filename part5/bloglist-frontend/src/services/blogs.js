import axios from "axios";
import { LOCAL_STORAGE_USER } from "../utils/useUser";
const baseUrl = "/api/blogs";

const getToken = () => {
  const stored = window.localStorage.getItem(LOCAL_STORAGE_USER);
  return JSON.parse(stored || "{}")["token"];
};

const getAll = async () => {
  const { data } = await axios.get(baseUrl);
  return data;
};

const create = async (blog) => {
  const { data } = axios.post(baseUrl, blog, {
    headers: {
      Authorization: `bearer ${getToken()}`,
    },
  });
  return data;
};

export default { getAll, create };
