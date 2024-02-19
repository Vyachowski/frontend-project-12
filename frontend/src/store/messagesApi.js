import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

export const messagesApi = createApi({
  reducerPath: 'channels',
  baseQuery: fetchBaseQuery({baseUrl: '/api/v1/channels'}),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    addMessage: builder.mutation({
      query: (messageText, channelId) => ({
        method: 'POST',
        body: { text: messageText, channelId},
      })
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        url: id,
        method: 'DELETE',
      })
    })
  })
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;
