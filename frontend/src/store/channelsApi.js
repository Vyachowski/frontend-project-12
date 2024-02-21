import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const channelsApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({baseUrl: '/api/v1/channels'}),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => '',
    }),
    addChannel: builder.mutation({
      query: (channelName) => ({
        method: 'POST',
        body: { name: channelName}
      })
    }),
    renameChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'PATCH',
      })
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      })
    })
  })
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
