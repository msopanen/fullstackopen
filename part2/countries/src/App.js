import { useEffect, useState } from "react";
import { getAll } from "./services/restcountries";

import CountriesFilter from "./components/CountriesFilter";
import Countries from "./components/Countries";
import CountriesList from "./components/CountriesList";
import CountryDetails from "./components/CountryDetails";
import WithNotification from "./components/WithNotification";

const ERROR_MGS =
  "could not load countries, check your network connection and try again";

const App = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    getAll()
      .then((allCountries) => setAllCountries(allCountries))
      .catch(() => setError(ERROR_MGS));
  }, []);

  const countries = allCountries.filter(
    filterNameBy({ filter: countryFilter })
  );

  return (
    <WithNotification message={error}>
      <CountriesFilter
        countryFilter={countryFilter}
        onFilterInputChange={setCountryFilter}
      />
      <Countries count={countries.length}>
        <CountriesList countries={countries} />
        <CountryDetails countries={countries} />
      </Countries>
    </WithNotification>
  );
};

export default App;

// --- Helpers ---
const filterNameBy =
  ({ filter }) =>
  ({ name }) => {
    return name.toLowerCase().includes(filter.toLowerCase());
  };
