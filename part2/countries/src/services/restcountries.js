import axios from "axios";

const baseUrl = "https://restcountries.com/v3.1/";
const fields = "area,capital,cca2,flags,languages,name";

// Normalize restcountries data to convenient model here
const getNormalizedReducedCountries = ({ data }) => {
  return data.map((country) => ({
    area: country.area,
    capital: country.capital,
    flag: country.flags.svg,
    name: country.name.common,
    cc: country.cca2,
    languages: country.languages,
  }));
};

export const getAll = () => {
  const res = axios.get(`${baseUrl}/all?fields=${fields}`);
  return res.then(getNormalizedReducedCountries);
};
