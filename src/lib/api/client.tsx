import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api', // API 기본 경로
    mode: 'cors',
    prepareHeaders: (headers) => {
      // 예: 인증 토큰 추가
      const token = getCookie('access_token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      headers.set('Access-Control-Allow-Origin', '*');
      headers.set(
        'state',
        JSON.stringify({ user: localStorage.getItem('user') }),
      );

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
    postLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
    }),
  }),
});

export const {
  usePostRegisterMutation,
  usePostLoginMutation,
  usePostLogoutMutation,
  useGetCheckMutation,
} = apiSlice;
