const TooManyMatches = () => (
  <div>Too many matches, specify another filter</div>
);
const NoMatches = () => <div>No matches, reduce filter</div>;

const Countries = ({ count, children }) => {
  return count < 1 ? <NoMatches /> : count > 10 ? <TooManyMatches /> : children;
};

export default Countries;
