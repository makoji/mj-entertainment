'use client';

import { useState, useEffect } from 'react';

interface Movie {
  id: number;
  backdrop_path: string;
  title: string;
  name: string;
  overview: string;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export default function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'http://localhost:5001/api/content/netflix-originals'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // Get a random movie from the list
        setMovie(data[Math.floor(Math.random() * data.length)]);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, []);

  function truncate(str: string | undefined, n: number) {
    return str && str.length > n ? str.substr(0, n - 1) + '...' : str;
  }

  return (
    <header
      className="relative h-[700px] text-white object-contain rounded-xl mx-2"
      style={{
        backgroundImage: `url("${TMDB_IMAGE_BASE_URL}${movie?.backdrop_path}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="ml-8 pt-36 h-48">
        <h1 className="text-5xl font-extrabold pb-1">
          {movie?.title || movie?.name}
        </h1>
        <div className="flex space-x-2">
          <button className="px-8 py-2 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors">
            Play
          </button>
          <button className="px-8 py-2 bg-gray-500 bg-opacity-50 text-white font-bold rounded hover:bg-gray-600 transition-colors">
            My List
          </button>
        </div>
        <h2 className="md:w-96 max-w-sm md:text-lg pt-4 leading-snug">
          {truncate(movie?.overview, 150)}
        </h2>
      </div>
    </header>
  );
}
