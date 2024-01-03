import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("Blog", () => {
  const mockUser = { username: "Paavo" };
  const mockBlog = {
    author: "TestAuthor",
    title: "TestTitle",
    url: "https://test-url",
    likes: 1,
    user: {
      username: "testauthor",
    },
  };

  const noOp = () => {};

  test("renders only title by default", () => {
    render(
      <Blog
        blog={mockBlog}
        loggedUser={mockUser}
        onUpdate={noOp}
        onRemove={noOp}
      />,
    );

    const title = screen.getByText("TestTitle");
    expect(title).toBeDefined();

    const author = screen.queryByText("TestAuthor");
    expect(author).toBeNull();

    const url = screen.queryByText("https://test-url");
    expect(url).toBeNull();

    const likes = screen.queryByText("likes:");
    expect(likes).toBeNull();
  });

  test("renders all data after show button press", async () => {
    const user = userEvent.setup();
    render(
      <Blog
        blog={mockBlog}
        loggedUser={mockUser}
        onUpdate={noOp}
        onRemove={noOp}
      />,
    );

    const title = screen.getByText("TestTitle");
    expect(title).toBeDefined();

    const showBtn = screen.getByText("show");
    await user.click(showBtn);

    const author = screen.getByText("TestAuthor", { exact: false });
    expect(author).toBeDefined();

    const url = await screen.getByText("https://test-url", { exact: false });
    expect(url).toBeDefined();

    const likes = screen.getByText("likes:", { exact: false });
    expect(likes).toBeDefined();
  });

  test("calls onUpdate callback twice when like button is pressed twice", async () => {
    const user = userEvent.setup();
    const updateSpy = jest.fn();

    render(
      <Blog
        blog={mockBlog}
        loggedUser={mockUser}
        onUpdate={updateSpy}
        onRemove={noOp}
      />,
    );

    const showBtn = screen.getByText("show");
    await user.click(showBtn);

    const likeBtn = screen.getByText("like");
    await user.click(likeBtn);
    await user.click(likeBtn);

    expect(updateSpy).toBeCalledTimes(2);
  });
});
