const CountriesFilter = ({ countryFilter, onFilterInputChange }) => {
  const handleFilterInput = (event) => onFilterInputChange(event.target.value);

  return (
    <div>
      find countries:
      <input value={countryFilter} onChange={handleFilterInput} />
    </div>
  );
};

export default CountriesFilter;
