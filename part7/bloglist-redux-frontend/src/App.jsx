import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import CreateNewBlog from "./components/CreateNewBlog";
import Togglable from "./components/Togglable";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlog,
  removeBlog,
  initBlogs,
  updateBlog,
} from "./reducers/blogReducer";
import { initUser, login, logout } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const createFormRef = useRef();

  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initBlogs());
    }
  }, [dispatch, user]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    dispatch(logout());
  };

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

  const handleUpdate = async (updatedBlog) => {
    dispatch(updateBlog(updatedBlog));
  };

  const handleRemove = async (removedBlog) => {
    dispatch(removeBlog(removedBlog));
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h1>log in to application</h1>
        <Notification />
        <div>
          username
          <input
            id="username-input"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password-input"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    );
  };

  return (
    <>
      {user ? (
        <div>
          <h2>
            {user.name} logged in
            <button onClick={handleLogout} type="button">
              logout
            </button>
          </h2>
          <h2>blogs</h2>
          <Notification />
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              loggedUser={user}
              onUpdate={handleUpdate}
              onRemove={handleRemove}
            />
          ))}
          <Togglable btnLabel="create" ref={createFormRef}>
            <CreateNewBlog onCreateNew={handleCreate} />
          </Togglable>
        </div>
      ) : (
        loginForm()
      )}
    </>
  );
};

export default App;
