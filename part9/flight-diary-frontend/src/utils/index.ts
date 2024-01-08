import { NewDiaryEntry, Visibility, Weather } from "../types";

export const toNewDiaryEntry = (e: React.SyntheticEvent): NewDiaryEntry => {
  const target = e.target as typeof e.target & {
    date: { value: string };
    visibility: { value: Visibility };
    weather: { value: Weather };
    comment: { value: string };
  };

  return {
    date: target.date.value,
    visibility: target.visibility.value,
    weather: target.weather.value,
    comment: target.comment.value,
  };
};
