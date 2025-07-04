'use client';

import Banner from './components/Banner';
import MovieRow from './components/MovieRow';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in and redirect to home page
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="bg-neutral-900">
      <Banner />
      <MovieRow
        title="Trending Now"
        fetchUrl="http://localhost:5001/api/content/trending"
      />
      <MovieRow
        title="Netflix Originals"
        fetchUrl="http://localhost:5001/api/content/netflix-originals"
      />
      <MovieRow
        title="Top Rated"
        fetchUrl="http://localhost:5001/api/content/top-rated"
      />
      <MovieRow
        title="Action Movies"
        fetchUrl="http://localhost:5001/api/content/action"
      />
    </div>
  );
}
