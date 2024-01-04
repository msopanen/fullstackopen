import { useEffect, useRef } from "react";
import CreateNewBlog from "./components/CreateNewBlog";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, initBlogs } from "./reducers/blogReducer";
import { initUser } from "./reducers/userReducer";
import { initUsers } from "./reducers/usersReducer";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Blogs from "./components/Blogs";

const App = () => {
  const createFormRef = useRef();

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

  const handleCreate = async ({ title, author, url }) => {
    try {
      dispatch(
        createBlog({
          title: title,
          author: author,
          url: url,
        }),
      );

      dispatch(
        setNotification({
          message: `a new blog ${title} added`,
        }),
      );
    } finally {
      createFormRef.current.toggleVisibility();
    }
  };

  return (
    <>
      {user ? (
        <div>
          <Logout user={user} />
          <Blogs user={user} />
          <Togglable btnLabel="create" ref={createFormRef}>
            <CreateNewBlog onCreateNew={handleCreate} />
          </Togglable>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default App;
