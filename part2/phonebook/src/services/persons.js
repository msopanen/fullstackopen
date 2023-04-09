import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getResponseData = (res) => res.data;

const getAllPersons = () => {
  const req = axios.get(baseUrl);
  return req.then(getResponseData);
};

const createPerson = (newPerson) => {
  const req = axios.post(baseUrl, newPerson);
  return req.then(getResponseData);
};

export { createPerson, getAllPersons };
