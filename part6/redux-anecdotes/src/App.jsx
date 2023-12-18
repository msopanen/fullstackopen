import { useSelector, useDispatch } from "react-redux";
import { selectAnecdotes, voteAnecdote } from "./reducers/anecdoteReducer";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const anecdotes = useSelector(selectAnecdotes);
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
      <AnecdoteForm />
    </div>
  );
};

export default App;
