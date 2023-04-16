const CountriesList = ({ countries }) => {
  if (countries.length > 1) {
    return countries.map(({ name }) => <div key={name}>{name}</div>);
  }
  // NOTE React 18 allows returning undefined and thus
  // that can be use for conditional rendering.
};

export default CountriesList;
