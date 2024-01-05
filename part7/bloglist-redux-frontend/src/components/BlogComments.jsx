import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { commentBlog, initBlogs, updateBlog } from "../reducers/blogReducer";
import { useField } from "../hooks";
import {
  Button,
  TextField,
  Typography,
  Link,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { Circle } from "@mui/icons-material";

const BlogComments = () => {
  const { id } = useParams();
  const blog = useSelector((state) => state.blog.find((r) => r.id === id));

  const comment = useField("text");

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

  const handleAddComment = () => {
    dispatch(commentBlog(blog.id, comment.value));
  };

  return (
    <>
      {blog ? (
        <>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            {blog.title}
          </Typography>
          <Link component={RouterLink} to={blog.url}>
            {blog.url}
          </Link>
          <div>
            {blog.likes} likes<Button onClick={handleLike}>Like</Button>
          </div>
          <div>added by {blog.user.name}</div>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Comments
          </Typography>
          <div>
            <TextField label="Comment" margin="normal" {...comment} />
          </div>
          <div>
            <Button variant="contained" onClick={handleAddComment}>
              add comment
            </Button>
          </div>
          <Box
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <List>
              {blog.comments.map((comment, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemIcon>
                    <Circle sx={{ width: 10 }} />
                  </ListItemIcon>
                  <ListItemText primary={comment} />
                </ListItem>
              ))}
            </List>
          </Box>
        </>
      ) : null}
    </>
  );
};

export default BlogComments;
