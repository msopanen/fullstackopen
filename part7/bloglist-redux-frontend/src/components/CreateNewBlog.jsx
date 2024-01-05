import { Button, TextField, Typography } from "@mui/material";
import { useField } from "../hooks";

const CreateNewBlog = ({ onCreateNew }) => {
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const handleCreateNew = () => {
    onCreateNew({ title: title.value, author: author.value, url: url.value });
  };

  return (
    <div style={{ display: "contents" }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Create new blog
      </Typography>
      <div>
        <TextField
          label="Blog title"
          placeholder="blog title"
          margin="normal"
          {...title}
        />
      </div>
      <div>
        <TextField
          label="Blog author"
          placeholder="blog author"
          margin="normal"
          {...author}
        />
      </div>
      <div>
        <TextField
          label="Blog url"
          placeholder="blog url"
          margin="normal"
          {...url}
        />
      </div>

      <Button
        color="inherit"
        id="create-blog-button"
        variant="contained"
        onClick={handleCreateNew}
      >
        create
      </Button>
    </div>
  );
};

export default CreateNewBlog;
