import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const showRemoveBtn = (user, blog) => {
  const blogUserName = blog.user ? blog.user.username : "";
  return user.username === blogUserName;
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
    <div className="blog" style={blogStyle}>
      <Link data-test={"blog x"} to={`blogs/${blog.id}`}>
        {blog.title}
      </Link>
      <Button id="details-toggle-button" onClick={toggleDetails}>
        {showDetails ? "hide" : "show"}
      </Button>
      {showDetails && (
        <div>
          {blog.url}
          <br />
          likes: {blog.likes}{" "}
          <Button id="like-button" onClick={handleLike}>
            like
          </Button>
          <br />
          {blog.author}
        </div>
      )}
      <br />
      {showRemoveBtn(loggedUser, blog) && (
        <button id="remove-button" onClick={handleRemove}>
          remove
        </button>
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
