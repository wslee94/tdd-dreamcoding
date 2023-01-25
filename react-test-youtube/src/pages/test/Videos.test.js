import Videos from "../Videos";
import { withAllContexts, withRouter } from "../../tests/utils";
import { fakeVideo, fakeVideos } from "../../tests/videos";
import { render, waitFor, screen } from "@testing-library/react";
import { Route } from "react-router-dom";

describe("Videos", () => {
  const fakeYoutube = {
    search: jest.fn(),
  };

  beforeEach(() => {
    fakeYoutube.search.mockImplementation((keyword) => {
      return keyword ? [fakeVideo] : fakeVideos;
    });
  });

  afterEach(() => {
    fakeYoutube.search.mockReset();
  });

  it("renders all videos when keyword is not specified", async () => {
    render(
      withAllContexts(
        withRouter(<Route path="/" element={<Videos />} />),
        fakeYoutube
      )
    );

    await waitFor(() => {
      expect(fakeYoutube.search).toHaveBeenCalledWith(undefined);
      expect(screen.getAllByRole("listitem")).toHaveLength(fakeVideos.length);
    });
  });

  it("when keyword is specified, renders search results", async () => {
    render(
      withAllContexts(
        withRouter(
          <>
            <Route path="/" element={<Videos />} />
            <Route path="/:keyword" element={<Videos />} />
          </>,
          "/fake-keyword"
        ),
        fakeYoutube
      )
    );

    await waitFor(() => {
      expect(fakeYoutube.search).toHaveBeenCalledWith("fake-keyword");
      expect(screen.getAllByRole("listitem")).toHaveLength(1);
    });
  });

  it("renders loading state when items are being fetched", () => {
    render(
      withAllContexts(
        withRouter(<Route path="/" element={<Videos />} />),
        fakeYoutube
      )
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders error state when fetching item fails", async () => {
    fakeYoutube.search.mockImplementation(() => {
      throw new Error("error");
    });

    render(
      withAllContexts(
        withRouter(<Route path="/" element={<Videos />} />),
        fakeYoutube
      )
    );

    await waitFor(() => {
      expect(screen.getByText("Something is wrong 😖")).toBeInTheDocument();
    });
  });
});
