import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import { useUser } from "./utils/useUser";
import Notification from "./components/Notification";
import CreateNewBlog from "./components/CreateNewBlog";
import Togglable from "./components/Togglable";
import sortBlogs from "./utils/blogSorter";
import { setNotification } from "./reducers/notificationReducer";
import { useDispatch } from "react-redux";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser, clearUser] = useUser();

  const createFormRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortBlogs(blogs)));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (error) {
      dispatch(
        setNotification({
          message: "wrong username or password",
          error: true,
        }),
      );
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    clearUser();
  };

  const handleCreate = async ({ title, author, url }) => {
    try {
      const blog = await blogService.createBlog({
        title: title,
        author: author,
        url: url,
      });

      // Add newly created blog to the list of the blogs
      // NOTE: instead of relading all of the blogs we can use
      // newly created blog object to concatenate it at the end
      // on the blogs.
      setBlogs((prevBlogs) => sortBlogs(prevBlogs.concat(blog)));

      dispatch(
        setNotification({
          message: `a new blog ${title} added`,
        }),
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: "could not create new blog",
          error: true,
        }),
      );
    } finally {
      createFormRef.current.toggleVisibility();
    }
  };

  const handleUpdate = async (updatedBlog) => {
    try {
      const blog = await blogService.updateBlog(updatedBlog.id, updatedBlog);
      setBlogs((prevBlogs) =>
        sortBlogs(
          prevBlogs.map((r) =>
            r.id === blog.id ? { ...r, likes: blog.likes } : r,
          ),
        ),
      );
    } catch (error) {
      dispatch(
        setNotification({
          message: `could not update blog: ${error.message}`,
          error: true,
        }),
      );
    }
  };

  const handleRemove = async (removedBlog) => {
    try {
      if (
        window.confirm(`do you want to remove blog: ${removedBlog.title} ?`)
      ) {
        await blogService.deleteBlog(removedBlog.id);
        setBlogs((prevBlogs) =>
          prevBlogs.filter((r) => r.id !== removedBlog.id),
        );
      }
    } catch (error) {
      dispatch(
        setNotification({
          message: "could not delete blog",
          error: true,
        }),
      );
    }
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
