'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface Movie {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  name: string;
}

interface MovieRowProps {
  title: string;
  fetchUrl: string;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';

export default function MovieRow({ title, fetchUrl }: MovieRowProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(fetchUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="my-8 ">
      <h2 className="text-2xl font-bold text-white mb-4 ml-4">{title}</h2>
      <div className="flex overflow-y-hidden overflow-x-scroll p-4 space-x-4 custom-scrollbar">
        {movies.map((movie) => (
          <motion.div
            key={movie.id}
            className="flex-shrink-0 cursor-pointer"
            onClick={() => handleMovieClick(movie.id)}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <img
              className="w-40 h-60 object-cover rounded-lg shadow-lg"
              src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
              alt={movie.title || movie.name}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
