import { useEffect, useState } from "react";
import { getWeatherInfoFor } from "../services/openweathermap";
import WithNotification from "./WithNotification";

const ERROR_MSG = "Could not load weather data";

const WeatherInfo = ({ weather }) => {
  const { iconId, description, temperature, windSpeed } = weather;
  return (
    <>
      <div>temperature {temperature} Celcius</div>
      {iconId && (
        <img
          src={`https://openweathermap.org/img/wn/${iconId}@2x.png`}
          alt={description}
        />
      )}
      <div>wind speed {windSpeed} m/s</div>
    </>
  );
};
const CountryWeather = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    getWeatherInfoFor({ country })
      .then((data) => setWeather(data))
      .catch(() => setError(ERROR_MSG));
  }, [country]);

  return (
    <WithNotification message={error}>
      <h2>Weather in {country.capital}</h2>
      <WeatherInfo weather={weather} />
    </WithNotification>
  );
};

export default CountryWeather;
