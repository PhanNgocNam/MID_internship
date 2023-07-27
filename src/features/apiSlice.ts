import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DOMAIN } from "../configs/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: DOMAIN + "/v2/api/" }),
  endpoints: (builder) => ({
    getHomepageDate: builder.query<any, void>({ query: () => "/get/home" }),
    getCurrentSongById: builder.query({
      query: (id) => `get/song/sound?id=${id}`,
    }),
    getSongInfoById: builder.query({
      query: (id) => `get/song/info?id=${id}`,
    }),
    getLyricById: builder.query({
      query: (id) => `get/song/lyric?id=${id}`,
    }),
    getPlaylistInfoById: builder.query({
      query: (id) => `get/playlist/info?id=${id}`,
    }),
    getSearchData: builder.query({
      query: (id) => `get/song/search?id=${id}`,
    }),
  }),
});

export const {
  useGetHomepageDateQuery,
  useGetCurrentSongByIdQuery,
  useGetSongInfoByIdQuery,
  useGetLyricByIdQuery,
  useGetPlaylistInfoByIdQuery,
  useGetSearchDataQuery,
} = apiSlice;
