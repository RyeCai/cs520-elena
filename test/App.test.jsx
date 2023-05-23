import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import App from "../src/App";

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
};
global.navigator.geolocation = mockGeolocation;

beforeAll(() => render(<App />));

describe("App initialized Correctly", () => {
  it("Map is rendered", () => {
    expect(screen.getByRole("link")).toBeInTheDocument();
  });

  // it("Textfields are active", () => {
  //   expect(screen.getByTestId("start-input")).not.toBeDisabled();
  //   expect(screen.getByText("End Location")).not.toBeDisabled();
  // });
});
