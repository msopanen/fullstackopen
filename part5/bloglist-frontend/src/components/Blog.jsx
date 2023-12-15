import { useState } from "react";

const Blog = ({ blog, onUpdate }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = (e) => {
    e.preventDefault();
    setShowDetails((prev) => !prev);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    onUpdate(likedBlog);
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
    </div>
  );
};

export default Blog;
