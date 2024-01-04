import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { initBlogs, updateBlog } from "../reducers/blogReducer";

const BlogComments = () => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.find((r) => r.id === id));

  const dispatch = useDispatch();

  // Blogs must be loaded in case browser is refreshed in route
  // blogs/:id or store doesn't have blogs data and blog is always
  // undefined. Thus initBlogs is called in useEffect hook.
  // NOTE: this is not optimal way to load all blogs to find only one
  // blog. Compare how single User component is done with more optimal
  // but also more laborous way
  useEffect(() => {
    if (id) {
      dispatch(initBlogs());
    }
  }, [dispatch, id]);

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateBlog(likedBlog));
  };

  return (
    <>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <Link to={blog.url}>{blog.url}</Link>
          <br />
          {blog.likes} likes<button onClick={handleLike}>Like</button>
          <br />
          added by {blog.user.name}
        </>
      ) : null}
    </>
  );
};

export default BlogComments;
