import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

const addDiary = async (entry: NewDiaryEntry) => {
  const { data } = await axios.post<NewDiaryEntry>(baseUrl, entry);
  return data;
};

export default {
  getAll,
  addDiary,
};
