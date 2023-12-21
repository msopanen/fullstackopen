import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from "../services/anecdotes";
import {
  useNotificationDispatch,
  showNotification,
} from "./NotificationContext";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const dispatchNotification = useNotificationDispatch();

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: ({ content }) => {
      queryClient.invalidateQueries("anecdotes");
      dispatchNotification(showNotification(`'${content}' created`, 5000));
    },
    onError: ({ response }) => {
      dispatchNotification(showNotification(`${response.data.error}`, 5000));
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate(content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
