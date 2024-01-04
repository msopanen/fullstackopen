import { useDispatch, useSelector } from "react-redux";
import Notification from "./Notification";
import Blog from "./Blog";
import { removeBlog, updateBlog } from "../reducers/blogReducer";

const Blogs = ({ user }) => {
  const blogs = useSelector((state) => state.blog);

  const dispatch = useDispatch();

  const handleUpdate = async (updatedBlog) => {
    dispatch(updateBlog(updatedBlog));
  };

  const handleRemove = async (removedBlog) => {
    dispatch(removeBlog(removedBlog));
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
    </>
  );
};

export default Blogs;
