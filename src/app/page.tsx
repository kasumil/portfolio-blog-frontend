'use client';

import { useGetCheckQuery } from '@/lib/api/client';

export default function Home() {
  const { data: check, isLoading, error } = useGetCheckQuery();
  console.log(error, isLoading, check);
  return <div>홈</div>;
}
