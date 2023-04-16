import { useEffect, useState } from "react";
import { getAll } from "./services/restcountries";

import CountriesFilter from "./components/CountriesFilter";
import Countries from "./components/Countries";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    getAll().then((allCountries) => {
      setAllCountries(allCountries);
    });
  }, []);

  const countries = allCountries.filter(
    filterNameBy({ filter: countryFilter })
  );

  return (
    <>
      <CountriesFilter
        countryFilter={countryFilter}
        onFilterInputChange={setCountryFilter}
      />
      <Countries count={countries.length}>
        <CountriesList countries={countries} />
        <CountryDetails countries={countries} />
      </Countries>
    </>
  );
};

export default App;

// --- Helpers ---
const filterNameBy =
  ({ filter }) =>
  ({ name }) => {
    return name.toLowerCase().includes(filter.toLowerCase());
  };
