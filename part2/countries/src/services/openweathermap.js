import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY;

const UNITS = "metric";

const baseUrl = "http://api.openweathermap.org/data/2.5/weather";

const getNormalizedReducedWeatherData = ({ data }) => {
  return {
    temperature: data.main.temp,
    windSpeed: data.wind.speed,
    iconId: data.weather[0].icon,
    description: data.weather[0].description,
  };
};

export const getWeatherInfoFor = ({ country }) => {
  const res = axios.get(
    `${baseUrl}?q=${country.capital},${country.cc}&APPID=${API_KEY}&units=${UNITS}`
  );
  return res.then(getNormalizedReducedWeatherData);
};
