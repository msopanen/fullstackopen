import { useState } from "react";

import Header from "./Header";
import Button from "./Button";
import Anecdote from "./Anecdote";

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

  const [selecteIdx, setSelectedIdx] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNextAnecdote = () => {
    const getRandomIdx = (max) => {
      return Math.floor(Math.random() * max);
    };

    const randomAnecdoteIdx = getRandomIdx(anecdotes.length);
    setSelectedIdx(randomAnecdoteIdx);
  };

  const handleVote = () => {
    const getIncermentedVotes = ({ votes, selectedIdx }) => {
      // Example of clean way using map function that increments matching ndex
      // count and returns new array without mutating existing votes.
      // return votes.map((count, i) => (i === selectedIdx ? count + 1 : count));

      // Take copy of the original votes array and mutate only copied array.
      // In React it is strictly forbidden to mutate state obects so copy from
      // original state is taken before array item is incremented.
      const newVotes = [...votes];
      newVotes[selecteIdx] += 1;
      return newVotes;
    };

    setVotes(getIncermentedVotes({ votes, selecteIdx }));
  };

  const getMostVotedCount = (votes) => {
    // Sort votes array to desceding order and return item
    // at the first index to find most votes.
    // NOTE: Array.sort changes original array sort and thus
    // we need to create new temporay array
    return [...votes].sort((a, b) => b - a).at(0);
  };

  const mostVotedCount = getMostVotedCount(votes);
  const mostVotedIdx = votes.indexOf(mostVotedCount);

  return (
    <>
      <Header heading="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selecteIdx]} votes={votes[selecteIdx]} />
      <Button text="Vote" onClick={() => handleVote()} />
      <Button text="Next anecdote" onClick={() => handleNextAnecdote()} />
      <Header heading="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[mostVotedIdx]} votes={mostVotedCount} />
    </>
  );
};

export default App;
