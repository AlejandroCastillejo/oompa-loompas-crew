import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ListItem from "./ListItem";

describe("ListItem component", () => {
  const data = {
    id: 1,
    first_name: "Fleming",
    last_name: "Pouck",
    image: "https://s3.eu-central-1.amazonaws.com/napptilus/level-test/6.jpg",
    profession: "Metalworker",
    gender: "Man",
  };

  const renderComponentWithProps = () =>
    render(
      <MemoryRouter>
        <ListItem
          id={data.id}
          first_name={data.first_name}
          last_name={data.last_name}
          profession={data.profession}
          imageSrc={data.image}
          gender={data.gender}
        />
      </MemoryRouter>
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

  //ToDo: test Link
});
