import { screen, cleanup } from "@testing-library/react";
import { renderWithProviders } from "../../redux/test-utils";

import { getDetailData } from "../../services/oompa-loompas.service";

import DetailView from "./DetailView";

jest.mock("../../services/oompa-loompas.service.js");

describe("Detail View", () => {
  const mockGetDetailData = () => {
    getDetailData.mockResolvedValue({
      data: {
        last_name: "Pouck",
        description: "<h1>Lorem ipsum dolor sit amet...</h1>",
        image:
          "https://s3.eu-central-1.amazonaws.com/napptilus/level-test/6.jpg",
        profession: "Metalworker",
        first_name: "Fleming",
        gender: "M",
      },
    });
  };

  beforeEach(() => {
    mockGetDetailData();
  });
  afterEach(cleanup);

  test("should display image", async () => {
    renderWithProviders(<DetailView />, {});

    const image = await screen.findByRole("img");
    expect(image).toBeInTheDocument();

    const altText = await screen.findByAltText("Fleming's picture");
    expect(altText).toBeInTheDocument();
  });

  test("should display full name", async () => {
    renderWithProviders(<DetailView />);

    const fullName = await screen.findByText("Fleming Pouck");
    expect(fullName).toBeInTheDocument();
  });

  test("should display profession", async () => {
    renderWithProviders(<DetailView />);

    const profession = await screen.findByText("Metalworker");
    expect(profession).toBeInTheDocument();
  });

  test("should display gender", async () => {
    renderWithProviders(<DetailView />);

    const gender = await screen.findByText("Man");
    expect(gender).toBeInTheDocument();
  });

  test("should display description and render html", async () => {
    renderWithProviders(<DetailView />);

    const tag = await screen.findByRole("heading", {
      level: 1,
      name: "Lorem ipsum dolor sit amet...",
    });
    expect(tag).toBeInTheDocument();
  });
});
