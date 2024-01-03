const Blog = require("../models/blog");
const { userExtractor, authenticate } = require("../utils/middlewares");

const blogsRouter = require("express").Router();

blogsRouter.get("/", async (request, response, next) => {
  try {
    const blogs = await Blog.find({}).populate("user", {
      username: 1,
      name: 1,
      id: 1,
    });
    response.json(blogs);
  } catch (error) {
    next(error);
  }
});

blogsRouter.post(
  "/",
  authenticate,
  userExtractor,
  async (request, response, next) => {
    const { user } = request;

    try {
      const blog = new Blog({ ...request.body, user: user._id });
      const savedBlog = await blog.save();

      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();

      response.status(201).json(savedBlog);
    } catch (error) {
      next(error);
    }
  },
);

blogsRouter.put("/:id", async (request, response, next) => {
  const { id } = request.params;
  const { likes } = request.body;
  const blog = {
    likes,
  };
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
      new: true,
      runValidators: true,
      context: "query",
    });
    if (updatedBlog) {
      response.status(200).json(updatedBlog);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

blogsRouter.delete(
  "/:id",
  authenticate,
  userExtractor,
  async (request, response, next) => {
    const { id } = request.params;
    const { user } = request;

    try {
      const blogToDelete = await Blog.findById(id);

      if (blogToDelete) {
        if (blogToDelete.user.toString() !== user._id.toString()) {
          return response.status(403).json({ error: "forbidden to delete" });
        }

        await blogToDelete.deleteOne();

        const deletedBlogId = blogToDelete._id.toString();
        user.blogs = user.blogs.filter((r) => r.toString() !== deletedBlogId);
        await user.save();
      }

      return response.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

module.exports = blogsRouter;
