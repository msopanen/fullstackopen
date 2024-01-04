import { useParams } from "react-router-dom";
import { initUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./Notification";

const User = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const { id } = useParams();

  // In case of the single user separate BE endpoint and
  // reducer is created to find user by id. This is more
  // optimal way compared to BlogComments where all blogs
  // are used to find single blog with comments.
  // NOTE: Witout initUser and BE query to load single user
  // data route users/:id doesn't work when browser is refreshed
  // because store doesn't have user data after refresh.
  // Thus most optimal way to load data is to implement BE
  // endpoint with id.
  useEffect(() => {
    if (id) {
      dispatch(initUser(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Notification />
      {userData ? (
        <div>
          <h2>{userData.name}</h2>
          <h3>added blogs</h3>
          <ul>
            {userData.blogs.map((r) => (
              <li key={r.id}>{r.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>{`could not load blogs for id: ${id}`}</div>
      )}
    </>
  );
};

export default User;
