import { useDispatch, useSelector } from "react-redux";
import { selectAnecdotes, voteAnecdote } from "../reducers/anecdoteReducer";
import { selectFilter } from "../reducers/filterReducer";

const filterFn = (filter) => (r) => {
  return r.content.toLowerCase().includes(filter.toLowerCase());
};

const AnecdoteList = () => {
  const anecdotes = useSelector(selectAnecdotes);
  const filter = useSelector(selectFilter);

  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(voteAnecdote(id));
  };

  console.log({ filter });
  return (
    <>
      {anecdotes.filter(filterFn(filter)).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
