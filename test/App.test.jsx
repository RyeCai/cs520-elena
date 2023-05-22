import { render, screen } from "@testing-library/react";
import {vi} from "vitest"

import App from "../src/App";

const mockGeolocation = {
  getCurrentPosition: vi.fn(),
};

global.navigator.geolocation = mockGeolocation;

describe("App component", () => {
    it("App is rendered correctly", () => {
        render(<App/>);
        expect(screen.getByLabelText("Start Location")).toBeInTheDocument();
    })
})