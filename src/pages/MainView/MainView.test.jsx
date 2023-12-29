import { MemoryRouter } from "react-router-dom";
import { screen, cleanup } from "@testing-library/react";

import { renderWithProviders } from "../../redux/test-utils";
import { getPageData } from "../../services/oompa-loompas.service";

import "../../__mocks__/intersectionObserverMock";

import MainView from "./MainView";

jest.mock("../../services/oompa-loompas.service.js");

//ToDo: test Search Bar
describe("Main View", () => {
  const mockGetPageData = () => {
    getPageData.mockResolvedValue({
      data: {
        results: [
          {
            id: 1,
            last_name: "Pouck",
            image:
              "https://s3.eu-central-1.amazonaws.com/napptilus/level-test/6.jpg",
            profession: "Metalworker",
            first_name: "Fleming",
            gender: "M",
          },
        ],
      },
    });
  };

  const renderComponent = () =>
    renderWithProviders(
      <MemoryRouter>
        <MainView />
      </MemoryRouter>,
      {}
    );

  //   describe("before loading results", () => {
  //     test('should display "Loading results...', () => {
  //       mockGetPagelData();

  //       renderWithProviders(<MainView />);

  //       const loadingText = screen.findByText("Loading next page...");
  //       expect(loadingText).toBeInTheDocument();
  //     });
  //   });

  describe("after loading results", () => {
    beforeEach(() => {
      mockGetPageData();
    });
    afterEach(cleanup);

    test("should display the list of results", async () => {
      renderComponent();
      const resultsList = await screen.findByRole("list");
      expect(resultsList).toBeInTheDocument();
    });
    test('should not diaplay "Loading next page..."', async () => {});

    describe("should display all the items on the list of results", () => {
      test("should display image of first item", async () => {
        renderComponent();

        const altText = await screen.findByAltText("Fleming's picture");
        expect(altText).toBeInTheDocument();
      });

      test("should display full name of first item", async () => {
        renderComponent();

        const fullName = await screen.findByText("Fleming Pouck");
        expect(fullName).toBeInTheDocument();
      });

      test("should display profession of first item", async () => {
        renderComponent();

        const profession = await screen.findByText("Metalworker");
        expect(profession).toBeInTheDocument();
      });

      test("should display gender of first item", async () => {
        renderComponent();

        const gender = await screen.findByText("Man");
        expect(gender).toBeInTheDocument();
      });
    });
  });
});
