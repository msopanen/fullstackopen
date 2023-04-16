const Header = ({ country }) => <h1>{country.name}</h1>;

const Area = ({ country }) => <p>{`area: ${country.area}`}</p>;
const Capital = ({ country }) => {
  const capital = country.capital[0] || "Not defined";
  return <p>{`capital: ${capital}`}</p>;
};

const Languages = ({ country }) => {
  return (
    <>
      <label>languages</label>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
    </>
  );
};
const Flag = ({ country }) => {
  const flagStyle = {
    width: "50%",
    height: "50%",
  };
  return (
    <img
      src={country.flag}
      alt={`Could not load flage of ${country.name}`}
      style={flagStyle}
    />
  );
};

const CountryDetails = ({ countries }) => {
  if (countries.length === 1) {
    const country = countries.pop();
    return (
      <>
        <Header country={country} />
        <Capital country={country} />
        <Area country={country} />
        <Languages country={country} />
        <Flag country={country} />
      </>
    );
  }
  // NOTE React 18 allows returning undefined and thus
  // that can be use for conditional rendering.
};

export default CountryDetails;
