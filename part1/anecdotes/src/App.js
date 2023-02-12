import { useState } from "react";

import Button from "./Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    const getRandomIdx = (max) => {
      return Math.floor(Math.random() * max);
    };

    const randomAnecdoteIdx = getRandomIdx(anecdotes.length);
    setSelected(randomAnecdoteIdx);
  };

  const handleVote = () => {
    // Clean way using map that increments matching index
    // count and returns new array without mutating existing votes.
    const getIncermentedVotes = ({ votes, selected }) => {
      return votes.map((count, i) => (i === selected ? count + 1 : count));
    };

    setVotes(getIncermentedVotes({ votes, selected }));
  };

  const selectedAnecdote = anecdotes[selected];
  const selectedVotes = votes[selected];

  return (
    <>
      <div>{selectedAnecdote}</div>
      <div>has {selectedVotes} votes</div>
      <Button text="Vote" onClick={() => handleVote()} />
      <Button text="Next anecdote" onClick={() => handleNextAnecdote()} />
    </>
  );
};

export default App;
