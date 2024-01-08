import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

const getAll = async () => {
  const { data } = await axios.get<DiaryEntry[]>(baseUrl);
  return data;
};

const addDiary = async (entry: NewDiaryEntry) => {
  try {
    const { data } = await axios.post<DiaryEntry>(baseUrl, entry);
    return data;
  } catch (error) {
    console.log({ error });
    throw new Error(
      axios.isAxiosError(error) ? `${error.response?.data}` : "Unknown error",
    );
  }
};

export default {
  getAll,
  addDiary,
};
