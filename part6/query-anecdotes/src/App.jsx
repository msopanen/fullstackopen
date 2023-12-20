import { useQuery } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import anecdoteService from "./services/anecdotes";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  const { isSuccess, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteService.getAnecdotes,
  });

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {isSuccess &&
        data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
