import { useEffect, useState } from "react";
import diaryService from "./services/flightDiary";
import { DiaryEntry } from "./types";
import { toNewDiaryEntry } from "./utils";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data);
    });
  }, []);

  useEffect(() => {
    if (error.length > 0) {
      const timeout = setTimeout(() => setError(""), 3000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error]);

  const add = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    diaryService
      .addDiary(toNewDiaryEntry(e))
      .then((diary) => setDiaries((prev) => prev.concat(diary)))
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Add new entry</h2>
      {error.length > 0 && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={add}>
        <div>
          date
          <input name="date" />
          <br />
          visibility
          <input name="visibility" />
          <br />
          weather
          <input name="weather" />
          <br />
          comment
          <input name="comment" />
          <br />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map((d) => {
        return (
          <div key={d.id}>
            <b>{d.date}</b>
            <p>
              weather: {d.weather}
              <br />
              visibility: {d.visibility}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default App;
