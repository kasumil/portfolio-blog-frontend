import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { get } from 'http';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api', // API 기본 경로
    prepareHeaders: (headers, { getState }) => {
      // 예: 인증 토큰 추가
      const token = getCookie('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      // 다른 커스텀 헤더 추가
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postRegister: builder.mutation({
      query: (data) => ({
        url: '/auth/register',
        method: 'POST',
        body: data,
      }),
    }),
    postLogin: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
    }),
    getCheck: builder.mutation({
      query: () => '/auth/check',
    }),
    // 1. 모든 포스트 가져오기
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'], // 캐싱 및 갱신을 위한 태그
    }),
    // 2. 특정 포스트 가져오기
    getPostById: builder.query({
      query: (id) => `/posts/${id}`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    // 3. 포스트 생성
    createPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'], // 새로운 데이터 생성 후 캐시 갱신
    }),
    // 4. 포스트 수정
    updatePost: builder.mutation({
      query: ({ id, ...updatedPost }) => ({
        url: `/posts/${id}`,
        method: 'PUT', // 또는 PATCH
        body: updatedPost,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    // 5. 포스트 삭제
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
  }),
});

export const {
  usePostRegisterMutation,
  usePostLoginMutation,
  useGetCheckMutation,
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;
