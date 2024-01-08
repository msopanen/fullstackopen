import { useEffect, useState } from "react";
import flightDiaryService from "./services/flightDiary";
import { DiaryEntry } from "./types";

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    flightDiaryService.getAll().then((data) => {
      setDiaries(data);
    });
  }, []);

  return (
    <div>
      <h2>Diary entries</h2>
      {diaries.map((d, i) => {
        return (
          <div key={i}>
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
