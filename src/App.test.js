import { screen } from "@testing-library/react";
import { renderWithProviders } from "./redux/test-utils";

import "./__mocks__/intersectionObserverMock";

import App from "./App";

describe("App", () => {
  test("should render header", () => {
    renderWithProviders(<App />);

    const title = screen.getByText(/Oompa Loompa's Crew/i);
    expect(title).toBeInTheDocument();
  });
});
