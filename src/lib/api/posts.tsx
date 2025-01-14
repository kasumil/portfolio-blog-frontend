import { apiSlice } from './client';
import qs from 'qs';

const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.mutation({
      query: ({ page, username, tag }) => {
        const queryString = qs.stringify({ page, username, tag });
        return `/posts?${queryString}`;
      },
      providesTags: ['Get'],
    }),
    getPostById: builder.mutation({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Get', id }],
    }),
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `/posts/${id}`,
        method: 'PUT',
        body: updatedPost,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetPostsMutation,
  useGetPostByIdMutation,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = extendedApi;
