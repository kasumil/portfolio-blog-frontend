'use client';

import React from 'react';
import Pagination from '@/components/posts/Pagenation';
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import styled from 'styled-components';
import { createSelector } from '@reduxjs/toolkit';

const Spacer = styled.div`
  height: 4rem;
`;

const PaginationContainer = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const tag = searchParams.get('tag');
  // page가 없으면 1을 기본값으로 사용
  const page = parseInt(searchParams?.get('page'), 10) || 1;

  const lastPageSelector = createSelector(
    (state) => state.posts,
    (state) => state.user,
    (posts, user) => ({
      lastPage: posts.lastPage,
      posts: posts.posts,
      username: user?.user?.username,
    }),
  );
  const { lastPage, posts, username } = useSelector(lastPageSelector);

  // 포스트 데이터가 없거나 로딩 중이면 아무것도 보여주지 않음
  if (!posts) return null;

  return (
    <>
      <Pagination
        tag={tag}
        username={username}
        page={page}
        lastPage={lastPage}
      />
      <Spacer />
    </>
  );
};

export default PaginationContainer;
