import { useDispatch } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import {
  hideNotification,
  showNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const add = (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(addAnecdote(anecdote));
    dispatch(showNotification(`You added '${anecdote}'`));
    setTimeout(() => dispatch(hideNotification()), 5000);
  };

  return (
    <form onSubmit={add}>
      <div>
        <input name="anecdote" />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default AnecdoteForm;
