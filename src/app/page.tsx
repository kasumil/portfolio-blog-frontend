import HeaderConatiner from '@/containers/common/HeaderConatiner';
import PaginationContainer from '@/containers/posts/PaginationContainer';
import PostListContainer from '@/containers/posts/PostListContainer';

export default function Home() {
  return (
    <>
      <HeaderConatiner />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
}
