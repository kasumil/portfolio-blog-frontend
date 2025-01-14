'use client';

import Editor from '@/components/write/Editor';
import { changeField, initialize } from '@/store/module/write';
import { createSelector } from '@reduxjs/toolkit';
import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

const EditorContainer = (props: Props) => {
  const dispatch = useDispatch();
  const editorSelector = createSelector(
    (state: Object) => state.write,
    (write) => ({
      title: write.title,
      body: write.body,
    }),
  );
  const { title, body } = useSelector(editorSelector);
  const onChangeField = useCallback(
    (payload) => dispatch(changeField(payload)),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(initialize());
    };
  }, [dispatch]);
  return <Editor onChangeField={onChangeField} title={title} body={body} />;
};

export default EditorContainer;
