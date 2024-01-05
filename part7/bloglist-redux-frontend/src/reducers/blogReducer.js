import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification } from "./notificationReducer";

const sortFn = (a, b) => b.likes - a.likes;

const updateVoteFn = (blog) => (r) =>
  r.id === blog.id ? { ...r, likes: blog.likes } : r;

const updateCommentFn = (blog) => (r) =>
  r.id === blog.id ? { ...r, comments: blog.comments } : r;

const initialState = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort(sortFn);
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    voteBlog(state, action) {
      return state.map(updateVoteFn(action.payload)).sort(sortFn);
    },
    deleteBlog(state, action) {
      return state.filter((r) => r.id !== action.payload.id);
    },
    setComments(state, action) {
      return state.map(updateCommentFn(action.payload));
    },
  },
});

export const initBlogs = () => {
  return async (dispatch) => {
    const anecdotes = await blogService.getAll();
    dispatch(setBlogs(anecdotes));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createBlog(blog);
      dispatch(addBlog(newBlog));
    } catch (error) {
      dispatch(
        setNotification({
          message: "could not create new blog",
          error: true,
        }),
      );
    }
  };
};

export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.updateBlog(blog);
      dispatch(voteBlog(newBlog));
    } catch (error) {
      dispatch(
        setNotification({
          message: `could not update blog: ${error.message}`,
          error: true,
        }),
      );
    }
  };
};

export const removeBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.deleteBlog(blog.id);
      dispatch(deleteBlog(blog));
    } catch (error) {
      dispatch(
        setNotification({
          message: `could not delete blog: ${error.message}`,
          error: true,
        }),
      );
    }
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const commentedBlog = await blogService.commentBlog(id, comment);
      dispatch(setComments(commentedBlog));
    } catch (error) {
      dispatch(
        setNotification({
          message: "could not create new blog",
          error: true,
        }),
      );
    }
  };
};

export const { setBlogs, addBlog, voteBlog, deleteBlog, setComments } =
  blogSlice.actions;
export default blogSlice.reducer;
