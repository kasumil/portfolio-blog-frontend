'use client';

import TagBox from '@/components/write/TagBox';
import { changeField } from '@/store/module/write';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {};

const TagBoxContainer = (props: Props) => {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.write.tags);

  const onChangeTags = (newTags) => {
    dispatch(changeField({ key: 'tags', value: newTags }));
  };
  return <TagBox onChangeTags={onChangeTags} tags={tags} />;
};

export default TagBoxContainer;
