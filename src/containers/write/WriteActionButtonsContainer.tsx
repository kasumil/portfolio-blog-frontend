'use client';

import WriteActionButtons from '@/components/write/WriteActionButtons';
import { useCreatePostMutation } from '@/lib/api/posts';
import { wirtePostSuccess, writePostError } from '@/store/module/write';
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
    (state: Object) => state.user,
    (auth, user) => ({
      title: auth.title,
      body: auth.body,
      tags: auth.tags,
      post: auth.post,
      postError: auth.postError,
      user: user.user,
    }),
  );
  const { title, body, tags, post, postError, user } =
    useSelector(writeSelector);

  const [createPost, { isLoading, isError, error }] = useCreatePostMutation();

  const onPublish = async () => {
    try {
      const ret = await createPost({ title, body, tags }).unwrap();
      dispatch(wirtePostSuccess(ret));
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
      const { _id } = post;
      router.push(`/${user.username}/${_id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [router, post, postError]);
  return <WriteActionButtons onPublish={onPublish} onCancel={onCancel} />;
};

export default WriteActionButtonsContainer;
