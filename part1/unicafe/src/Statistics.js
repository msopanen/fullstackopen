import StatisticsLine from "./StatisticsLine";

const Statistics = (props) => {
  const { good, neutral, bad } = props;

  const sum = good + neutral + bad;
  const average = sum ? (good - bad) / sum : 0;
  const postive = sum ? (good / sum) * 100 : 0;

  return (
    <>
      <h1>statistics</h1>
      {sum > 0 ? (
        <table>
          <StatisticsLine text={`good ${good}`} />
          <StatisticsLine text={`neutral ${neutral}`} />
          <StatisticsLine text={`bad ${bad}`} />
          <StatisticsLine text={`all ${sum}`} />
          <StatisticsLine text={`average ${average}`} />
          <StatisticsLine text={`postitive ${postive} %`} />
        </table>
      ) : (
        <div>no feedback given</div>
      )}
    </>
  );
};

export default Statistics;
