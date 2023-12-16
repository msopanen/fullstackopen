import { useState } from "react";

const CreateNewBlog = ({ onCreateNew }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleCreateNew = () => {
    onCreateNew({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
          placeholder="blog title"
        />
      </div>
      <div>
        author:
        <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
          placeholder="blog author"
        />
      </div>
      <div>
        url:
        <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
          placeholder="blog url"
        />
      </div>
      <button onClick={handleCreateNew} type="button">
        create
      </button>
    </div>
  );
};

export default CreateNewBlog;
