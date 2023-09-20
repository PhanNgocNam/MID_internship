import { triggerPlayASingleSong } from "../features/currentSongActiveSlice";
import store from "../configs/store";

export const triggerPlayASong = (encodeID: string) => {
  store.dispatch(triggerPlayASingleSong({ activeSongId: encodeID }));
};
