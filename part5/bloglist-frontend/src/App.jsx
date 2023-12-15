import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import { useUser } from "./utils/useUser";
import Notification from "./components/Notification";
import CreateNewBlog from "./components/CreateNewBlog";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    error: false,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser, clearUser] = useUser();

  const createFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const delay = setTimeout(() => setNotification({ message: null }), 5000);
    return () => clearTimeout(delay);
  }, [notification]);

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
      setNotification({
        message: "wrong username or password",
        error: true,
      });
    }
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    clearUser();
  };

  const handleCreate = async ({ title, author, url }) => {
    try {
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url,
      });

      // Add newly created blog to the list of the blogs
      // NOTE: instead of relading all of the blogs we can use
      // newly created blog object to concatenate it at the end
      // on the blogs.
      setBlogs((prevBlogs) => prevBlogs.concat(blog));

      setNotification({
        message: `a new blog ${title} added`,
      });
    } catch (error) {
      setNotification({
        message: "could not create new blog",
        error: true,
      });
    } finally {
      createFormRef.current.toggleVisibility();
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <h1>log in to application</h1>
        <Notification notification={notification} />
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    );
  };

  return (
    <>
      {user ? (
        <div>
          {user.name}
          <button onClick={handleLogout} type="button">
            logout
          </button>
          <h2>blogs</h2>
          <Notification notification={notification} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
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
