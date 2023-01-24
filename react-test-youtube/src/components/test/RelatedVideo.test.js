import {
  screen,
  render,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Route } from "react-router-dom";
import { withAllContexts, withRouter } from "../../tests/utils";
import RelatedVideos from "../RelatedVideos";
import { fakeVideos } from "../../tests/videos";

describe("Related Video", () => {
  const fakeYoutube = {
    relatedVideos: jest.fn(),
  };

  afterEach(() => fakeYoutube.relatedVideos.mockReset());

  it("render correctly", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);

    const { asFragment } = render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );

    await waitForElementToBeRemoved(screen.getByText("Loading..."));
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders loading", () => {
    fakeYoutube.relatedVideos.mockImplementation(() => fakeVideos);

    render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error", async () => {
    fakeYoutube.relatedVideos.mockImplementation(() => {
      throw new Error("error");
    });

    render(
      withAllContexts(
        withRouter(<Route path="/" element={<RelatedVideos id="id" />} />),
        fakeYoutube
      )
    );

    await waitFor(() => {
      expect(screen.getByText("Something is wrong 😖")).toBeInTheDocument();
    });
  });
});
