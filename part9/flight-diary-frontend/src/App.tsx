import { useEffect, useState } from "react";
import diaryService from "./services/flightDiary";
import { DiaryEntry, NewDiaryEntry } from "./types";

const toNewDiaryEntry = (e: React.SyntheticEvent): NewDiaryEntry => {
  const target = e.target as typeof e.target & {
    date: { value: string };
    visibility: { value: string };
    weather: { value: string };
    comment: { value: string };
  };

  return {
    date: target.date.value,
    visibility: target.visibility.value,
    weather: target.weather.value,
    comment: target.comment.value,
  };
};

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAll().then((data) => {
      setDiaries(data);
    });
  }, []);

  const add = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const newEntry = toNewDiaryEntry(e);
    diaryService.addDiary(newEntry);
  };

  return (
    <div>
      <h2>Add new entry</h2>
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
