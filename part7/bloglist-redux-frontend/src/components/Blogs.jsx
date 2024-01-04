import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import Blog from "./Blog";
import {
  createBlog,
  initBlogs,
  removeBlog,
  updateBlog,
} from "../reducers/blogReducer";
import Togglable from "./Togglable";
import CreateNewBlog from "./CreateNewBlog";
import { setNotification } from "../reducers/notificationReducer";
import { useEffect, useRef } from "react";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blog);

  const createFormRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      dispatch(initBlogs());
    }
  }, [dispatch, user]);

  const handleUpdate = async (updatedBlog) => {
    dispatch(updateBlog(updatedBlog));
  };

  const handleRemove = async (removedBlog) => {
    dispatch(removeBlog(removedBlog));
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

  return (
    <>
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
    </>
  );
};

export default Blogs;
