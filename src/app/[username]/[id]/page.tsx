import React from 'react';
import HeaderConatiner from '@/containers/common/HeaderConatiner';
import PostViewerContainer from '@/containers/post/PostViewerContainer';

type Props = {};

const page = (props: Props) => {
  return (
    <>
      <HeaderConatiner />
      <PostViewerContainer />
    </>
  );
};

export default page;
