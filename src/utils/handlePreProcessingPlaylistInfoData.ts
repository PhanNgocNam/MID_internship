import { dispatchCurrentPlaylist } from "../features/playListActiveSlice";
import store from "../configs/store";

export const handlePreProcessingPlaylistInfoData = (playLists: any) => {
  const activePlaylist = playLists?.song?.items.map(
    (song: any) => song.encodeId
  );
  activePlaylist &&
    store.dispatch(dispatchCurrentPlaylist([...activePlaylist]));
};
