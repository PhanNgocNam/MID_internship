export const DOMAIN = "https://apisolfive.app.tranviet.site";

const API = {
  GET_DISCOVER_API: DOMAIN + "/api/get/home",
  GET_HOME_CHART_API: DOMAIN + "/api/get/charthome",
  PLAYLIST_INFO_API: DOMAIN + "/api/get/playlist/info",
  SONG_INFO_API: DOMAIN + "/api/get/song/sound",
  SONG_INFO_DETAILT_API: DOMAIN + "/api/get/song/info",
  SONG_INFO_LYRIC_API: DOMAIN + "/api/get/song/lyric",
  CREATE_PLAYLIST: DOMAIN + "/user/playlist/create",
  UPDATE_PLAYLIST: DOMAIN + "/user/playlist/update",
  LIKE_SONG: DOMAIN + "/user/song/like",
  ADD_TO_PLAYLIST: DOMAIN + "/user/playlist/add/song",
  REMOVE_TO_PLAYLIST: DOMAIN + "/user/playlist/remove/song",
  INIT_DATA: DOMAIN + "/user/info/init",
};

export default API;
