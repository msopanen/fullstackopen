const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const sum = good + neutral + bad;
  const average = sum ? (good - bad) / sum : 0;
  const postive = sum ? (good / sum) * 100 : 0;

  return (
    <>
      <h1>statistics</h1>
      {sum > 0 ? (
        <>
          good: {good}
          <br />
          neutral: {neutral}
          <br />
          bad: {bad}
          <br />
          all: {sum}
          <br />
          average: {average}
          <br />
          positive: {postive}%
        </>
      ) : (
        <div>no feedback given</div>
      )}
    </>
  );
};

export default Statistics;
