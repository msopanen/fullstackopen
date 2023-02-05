const Total = (props) => {
  const count =
    props.parts[0].exercises +
    props.parts[1].exercises +
    props.parts[2].exercises;

  return <p>Number of exercises {count}</p>;
};

export default Total;
