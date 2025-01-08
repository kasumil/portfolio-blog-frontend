'use client';

import { useSelector } from 'react-redux';

export default function Home() {
  const { token } = useSelector((state) => state.user);
  console.log(token);
  return <div>홈</div>;
}
