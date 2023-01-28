import Youtube from "../api/youtube";
// import FakeYoutubeClient from "../api/fakeYotubeClient";
import YoutubeClient from "../api/youtubeClient";
import { YoutubeApiContext } from "./YoutubeApiContext";

const client = new YoutubeClient();
const youtube = new Youtube(client);

export function YoutubeApiProvider({ children }) {
  return (
    <YoutubeApiContext.Provider value={{ youtube }}>
      {children}
    </YoutubeApiContext.Provider>
  );
}
