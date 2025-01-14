'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '@/components/posts/PostList';
import { useParams, useSearchParams } from 'next/navigation';
import { useGetPostsMutation } from '@/lib/api/posts';
import { listFailure, listSuccess } from '@/store/module/posts';
import { createSelector } from '@reduxjs/toolkit';

const PostListContainer = () => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const postsContainerSelector = createSelector(
    (state) => state.user,
    (state) => state.posts,
    (user, posts) => ({
      user: user.user,
      username: user.username,
      posts: posts.posts,
      postError: posts.error,
    }),
  );
  const { user, username, posts, postError } = useSelector(
    postsContainerSelector,
  );
  const tag = searchParams?.get('tag');
  // page가 없으면 1을 기본값으로 사용
  const page = parseInt(searchParams?.get('page'), 10) || 1;
  const [getData, { data, isLoading, error }] = useGetPostsMutation();

  useEffect(() => {
    getData({
      tag,
      username,
      page,
    });
  }, [dispatch, searchParams, username]);

  useEffect(() => {
    if (data) {
      dispatch(listSuccess({ posts: data.data, lastPage: data.lastPage }));
    }
    if (error) {
      dispatch(listFailure(error));
    }
  }, [data, error]);

  return (
    <PostList
      loading={isLoading}
      error={postError}
      posts={posts}
      showWriteButton={user}
    />
  );
};

export default PostListContainer;
