import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LocationSelection from "../src/components/LocationSelection";

const props = {
  selection: undefined,
  onSelect: vi.fn(),
  name: "Start",
  color: "error",
  text: "",
  setText: vi.fn(),
  testid: "start-input",
};

const user = userEvent.setup();

describe("<LocationSelection/>", () => {
  beforeEach(() => render(<LocationSelection {...props} />));
  describe("Initialization", () => {
    it("reset is disabled", () => {
      expect(screen.getByText("Reset", { exact: false })).toBeDisabled();
    });
    it("field is enabled", () => {
      expect(screen.getByTestId("start-input")).not.toBeDisabled();
    });
  });

  describe("input umass", () => {
    beforeEach(() => {
      screen.getByTestId("start-input").setAttribute("value", "umass");
      fireEvent.click(screen.getByText("Search", { exact: false }));
    });
    it("TextField changes value", () => {
      expect(screen.getByTestId("start-input")).toHaveAttribute(
        "value",
        "umass"
      );
    });
  });
});
