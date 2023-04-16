import { Fragment, useState } from "react";
import CountryDetails from "./CountryDetails";

const CountriesList = ({ countries }) => {
  const [showDetails, setShowDetails] = useState("");

  if (countries.length > 1) {
    return countries.map((country) => (
      <Fragment key={country.name}>
        <div>
          {country.name}
          {country.name !== showDetails && (
            <button onClick={() => setShowDetails(country.name)}>show</button>
          )}
        </div>
        {country.name === showDetails && (
          <CountryDetails countries={[country]} />
        )}
      </Fragment>
    ));
  }
  // NOTE React 18 allows returning undefined and thus
  // that can be use for conditional rendering.
};

export default CountriesList;
