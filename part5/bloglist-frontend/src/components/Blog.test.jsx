import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

describe("Blog", () => {
  test("renders only title by default", () => {
    const spyUpdateFn = jest.fn();
    const spyRemoveFn = jest.fn();

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

    render(
      <Blog
        blog={mockBlog}
        loggedUser={mockUser}
        onUpdate={spyUpdateFn}
        onRemove={spyRemoveFn}
      />,
    );

    const title = screen.getByText("TestTitle");
    expect(title).toBeDefined();
  });
});
