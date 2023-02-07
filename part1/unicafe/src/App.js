import { useState } from "react";
import Statistics from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <br />
      <button onClick={() => setGood(good + 1)}>good</button>
      <br />
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <br />
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <br />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
