import { useState } from "react";
import PropTypes from "prop-types";

const showRemoveBtn = (user, blog) => {
  return user.username === blog.user.username;
};

const Blog = ({ blog, loggedUser, onUpdate, onRemove }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails((prev) => !prev);
  };

  const handleLike = async () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    onUpdate(likedBlog);
  };

  const handleRemove = () => {
    onRemove(blog);
  };

  const blogStyle = {
    border: "solid",
    margin: "0.125rem",
    padding: "0.125rem",
  };

  return (
    <div style={blogStyle}>
      {blog.title}
      <button onClick={toggleDetails}>{showDetails ? "hide" : "show"}</button>
      {showDetails && (
        <div>
          {blog.url}
          <br />
          {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {blog.author}
        </div>
      )}
      <br />
      {showRemoveBtn(loggedUser, blog) && (
        <button onClick={handleRemove}>remove</button>
      )}
    </div>
  );
};

Blog.propTypes = {
  loggedUser: PropTypes.shape({
    username: PropTypes.string.isRequired,
  }),
  blog: PropTypes.shape({
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.shape({
      username: PropTypes.string.isRequired,
    }),
  }),
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default Blog;
