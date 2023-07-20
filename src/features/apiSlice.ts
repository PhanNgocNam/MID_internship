import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DOMAIN } from "../configs/api";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: DOMAIN + "/api" }),
  endpoints: (builder) => ({
    getCurrentSongById: builder.query({
      query: (id) => `/get/song/sound?id=${id}`,
    }),
    getSongInfoById: builder.query({
      query: (id) => `/get/song/info?id=${id}`,
    }),
    getPlaylistById: builder.query({
      query: (id) => `/get/playlist/info?id=${id}`,
    }),
    getLyricById: builder.query({
      query: (id) => `get/song/lyric?id=${id}`,
    }),
  }),
});

export const {
  useGetCurrentSongByIdQuery,
  useGetPlaylistByIdQuery,
  useGetSongInfoByIdQuery,
  useGetLyricByIdQuery,
} = apiSlice;
