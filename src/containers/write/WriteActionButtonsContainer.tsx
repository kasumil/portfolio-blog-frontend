'use client';

import WriteActionButtons from '@/components/write/WriteActionButtons';
import { useCreatePostMutation, useUpdatePostMutation } from '@/lib/api/posts';
import {
  updatePostSuccess,
  wirtePostSuccess,
  writePostError,
} from '@/store/module/write';
import { createSelector } from '@reduxjs/toolkit';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

const WriteActionButtonsContainer = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const writeSelector = createSelector(
    (state: Object) => state.write,
    (write) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }),
  );
  const { title, body, tags, post, postError, originalPostId } =
    useSelector(writeSelector);

  const [createPost, { isLoading, isError, error }] = useCreatePostMutation();
  const [updatePost, { isLoading: updateIsloading, error: updateError }] =
    useUpdatePostMutation();

  const onPublish = async () => {
    try {
      if (originalPostId) {
        const ret = await updatePost({
          title,
          body,
          tags,
          id: originalPostId,
        }).unwrap();
        dispatch(updatePostSuccess(ret));
      } else {
        const ret = await createPost({
          title,
          body,
          tags,
        }).unwrap();
        dispatch(wirtePostSuccess(ret));
      }
    } catch (e) {
      console.log(e);
      dispatch(writePostError(e));
    }
  };

  const onCancel = () => {
    router.back();
  };

  useEffect(() => {
    if (post) {
      const { _id, user } = post; // _id가 2개라서 헷깔리지 말것. _id는 생성물, user._id는 회원번호
      router.push(`/${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [router, post, postError]);
  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default WriteActionButtonsContainer;
