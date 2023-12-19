import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const filterFn = (filter) => (r) => {
  return r.content.toLowerCase().includes(filter.toLowerCase());
};

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter.text);

  const dispatch = useDispatch();

  const vote = (id, content) => {
    dispatch(voteAnecdote({ id, content }));
  };

  return (
    <>
      {anecdotes.filter(filterFn(filter)).map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id, anecdote.content)}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
