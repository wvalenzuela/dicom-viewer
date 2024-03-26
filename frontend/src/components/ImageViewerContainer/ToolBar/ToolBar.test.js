import React from "react";
import { render, screen } from "@testing-library/react";
//import userEvent from "@testing-library/user-event"; // will be used to test clicking behavior
import ToolBar from "./ToolBar.js";

describe("ToolBar", () => {
  // Mock callback functions
  const onPaintClick = jest.fn();
  const onMeasureClick = jest.fn();
  const onScrollClick = jest.fn();

  beforeEach(() => {
    render(
      <ToolBar
        onPaintClick={onPaintClick}
        onMeasureClick={onMeasureClick}
        onScrollClick={onScrollClick}
      />
    );
  });

  test("renders three buttons", () => {
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(3); // Expecting three buttons
  });
});
