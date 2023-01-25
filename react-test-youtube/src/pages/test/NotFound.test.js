import { screen, render, waitFor } from "@testing-library/react";
import { Route } from "react-router-dom";
import NotFound from "../NotFound";
import renderer from "react-test-renderer";
import { withRouter } from "../../tests/utils";

describe("Not Found", () => {
  it("renders correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<NotFound />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
