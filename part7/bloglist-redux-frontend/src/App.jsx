import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initBlogs } from "./reducers/blogReducer";
import { initUser } from "./reducers/userReducer";
import { initUsers } from "./reducers/usersReducer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Blogs from "./components/Blogs";

const App = () => {
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initBlogs());
      dispatch(initUsers());
    }
  }, [dispatch, user]);

  return (
    <>
      {user ? (
        <div>
          <Logout user={user} />
          <Blogs user={user} />
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
