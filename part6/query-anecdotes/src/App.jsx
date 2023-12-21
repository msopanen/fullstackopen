import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { getAnecdotes, voteAnecdote } from "./services/anecdotes";
import {
  useNotificationDispatch,
  showNotification,
} from "./components/NotificationContext";

const App = () => {
  const { isSuccess, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
  });

  const queryClient = useQueryClient();

  const dispatchNotification = useNotificationDispatch();

  const voteAnecdoteMutation = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: ({ content }) => {
      queryClient.invalidateQueries("anecdotes");
      dispatchNotification(showNotification(`'${content}' voted`, 5000));
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(anecdote);
  };

  if (isError) {
    return <div>anecdote service not available due to problems in server</div>;
  }

  console.log({ data });
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
