'use client';

import PostViewer from '@/components/post/PostViewer';
import { useGetPostByIdMutation } from '@/lib/api/posts';
import {
  readPostFailure,
  readPostSuccess,
  unloadPost,
} from '@/store/module/post';
import { redirect, useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const PostViewerContainer = () => {
  const { id } = useParams();
  if (!id) {
    redirect('/');
  }
  const [getData, { data: post, error, isLoading }] = useGetPostByIdMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    getData(id);
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(readPostSuccess(post));
    }
    if (error) {
      dispatch(readPostFailure(error));
    }
    return () => {
      dispatch(unloadPost());
    };
  }, [post, error]);

  return <PostViewer post={post} loading={isLoading} error={error} />;
};

export default PostViewerContainer;
