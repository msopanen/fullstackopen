import { useParams } from "react-router-dom";
import { initUser } from "../reducers/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Notification from "./Notification";

const User = () => {
  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const { id } = useParams();

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
