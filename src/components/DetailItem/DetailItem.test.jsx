import { render, screen, cleanup } from "@testing-library/react";

import DetailItem from "./DetailItem";

describe("DetailItem component", () => {
  const data = {
    first_name: "Fleming",
    last_name: "Pouck",
    description: "<h1>Lorem ipsum dolor sit amet...</h1>",
    image: "https://s3.eu-central-1.amazonaws.com/napptilus/level-test/6.jpg",
    profession: "Metalworker",
    gender: "Man",
  };

  const renderComponentWithProps = () =>
    render(
      <DetailItem
        first_name={data.first_name}
        last_name={data.last_name}
        profession={data.profession}
        imageSrc={data.image}
        gender={data.gender}
        description={data.description}
      />
    );

  beforeEach(() => {
    renderComponentWithProps();
  });
  afterEach(cleanup);

  test("should display image", () => {
    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();

    const altText = screen.getByAltText("Fleming's picture");
    expect(altText).toBeInTheDocument();
  });

  test("should display full name", () => {
    const fullName = screen.getByText("Fleming Pouck");
    expect(fullName).toBeInTheDocument();
  });

  test("should display profession", () => {
    const profession = screen.getByText("Metalworker");
    expect(profession).toBeInTheDocument();
  });

  test("should display gender", () => {
    const gender = screen.getByText("Man");
    expect(gender).toBeInTheDocument();
  });

  test("should display description and render html", () => {
    const tag = screen.getByRole("heading", {
      level: 1,
      name: "Lorem ipsum dolor sit amet...",
    });
    expect(tag).toBeInTheDocument();
  });
});
