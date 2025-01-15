'use client';

import PostActionButtons from '@/components/post/PostActionButtons';
import PostViewer from '@/components/post/PostViewer';
import { useDeletePostMutation, useGetPostByIdMutation } from '@/lib/api/posts';
import {
  readPostFailure,
  readPostSuccess,
  unloadPost,
} from '@/store/module/post';
import { initialize, setOriginalPost } from '@/store/module/write';
import { createSelector } from '@reduxjs/toolkit';
import { cookies } from 'next/headers';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PostViewerContainer = () => {
  const { id } = useParams();
  if (!id) {
    redirect('/');
  }
  const [getData, { data: post, error, isLoading }] = useGetPostByIdMutation();
  const [deleteData, { isLoading: deleteLoading, error: deleteError }] =
    useDeletePostMutation();
  const PostViwerSelector = createSelector(
    (state) => state.post,
    (state) => state.user,
    (post, user) => ({
      postData: post.post,
      postError: post.error,
      user: user.user,
    }),
  );
  const { postData, postError, user } = useSelector(PostViwerSelector);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    getData(id);
  }, [id]);

  useEffect(() => {
    if (post) {
      document.cookie = `post=${JSON.stringify(post)}`;
      dispatch(readPostSuccess(post));
    }
    if (error) {
      dispatch(readPostFailure(error));
    }
    return () => {
      dispatch(unloadPost());
    };
  }, [post, error]);

  const onEdit = () => {
    dispatch(setOriginalPost({ post: postData }));
    router.push('/write');
  };

  const onRemove = async () => {
    try {
      await deleteData(id);
      dispatch(initialize());
      router.push('/');
    } catch (e) {
      console.log('삭제 오류', e);
    }
  };

  const ownPost = (user && user?._id) === (postData && postData?.user?._id);

  return (
    <PostViewer
      post={postData}
      loading={isLoading}
      error={postError}
      actionButtons={
        ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />
      }
    />
  );
};

export default PostViewerContainer;
