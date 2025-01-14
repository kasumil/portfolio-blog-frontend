import React from 'react';
import Responsive from '@/components/common/Responsive';
import EditorContainer from '@/containers/write/EditorContainer';
import TagBoxContainer from '@/containers/write/TagBoxContainer';
import WriteActionButtonsContainer from '@/containers/write/WriteActionButtonsContainer';

type Props = {};

const page = (props: Props) => {
  return (
    <Responsive>
      <EditorContainer />
      <TagBoxContainer />
      <WriteActionButtonsContainer />
    </Responsive>
  );
};

export default page;
