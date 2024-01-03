import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CreateNewBlog from "./CreateNewBlog";

describe("CreateNewBlog", () => {
  test("calls onCreateNew callback with correct data when blog is created", async () => {
    const user = userEvent.setup();

    const createNewSpy = jest.fn();

    render(<CreateNewBlog onCreateNew={createNewSpy} />);

    for await (const field of ["blog title", "blog author", "blog url"]) {
      const input = screen.getByPlaceholderText(field);
      await userEvent.type(input, `this is ${field}`);
    }

    const createBtn = screen.getByText("create");
    await user.click(createBtn);

    expect(createNewSpy).toBeCalledWith({
      author: "this is blog author",
      title: "this is blog title",
      url: "this is blog url",
    });
  });
});
