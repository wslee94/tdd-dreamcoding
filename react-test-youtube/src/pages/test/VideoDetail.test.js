import { Route } from "react-router-dom";
import VideoDetail from "../VideoDetail";
import renderer from "react-test-renderer";
import { withRouter } from "../../tests/utils";
import { fakeVideo, fakeVideo as video } from "../../tests/videos";
import ChannelInfo from "../../components/ChannelInfo";
import RelatedVideos from "../../components/RelatedVideos";
import { render } from "@testing-library/react";

jest.mock("../../components/ChannelInfo");
jest.mock("../../components/RelatedVideos");

describe("VideoDetail", () => {
  afterEach(() => {
    ChannelInfo.mockReset();
    RelatedVideos.mockReset();
  });

  it("renders correctly", () => {
    const component = renderer.create(
      withRouter(<Route path="/" element={<VideoDetail />} />, {
        pathname: "/",
        state: { video },
      })
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  it("check props", () => {
    const { channelId, channelTitle } = fakeVideo.snippet;

    render(
      withRouter(<Route path="/" element={<VideoDetail />} />, {
        pathname: "/",
        state: { video },
      })
    );

    expect(ChannelInfo.mock.calls[0][0]).toStrictEqual({
      id: channelId,
      name: channelTitle,
    });

    expect(RelatedVideos.mock.calls[0][0]).toStrictEqual({
      id: video.id,
    });
  });
});
