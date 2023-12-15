import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import loginService from "./services/login";
import blogService from "./services/blogs";
import { useUser } from "./utils/useUser";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({
    message: null,
    error: false,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const [user, setUser, clearUser] = useUser();

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

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const blog = await blogService.create({
        title: title,
        author: author,
        url: url,
      });

      setBlogs((prevBlogs) => prevBlogs.concat(blog));

      setNotification({
        message: `a new blog ${title} added`,
      });

      setTitle("");
      setAuthor("");
      setUrl();
    } catch (error) {
      setNotification({
        message: "could not create new blog",
        error: true,
      });
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
          <h2>create new</h2>
          <div>
            title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button onClick={handleCreate} type="button">
            create
          </button>
        </div>
      ) : (
        loginForm()
      )}
    </>
  );
};

export default App;
