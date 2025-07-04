'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import YouTube from 'react-youtube';
import { motion, AnimatePresence } from 'framer-motion';
import { PlayCircle } from 'lucide-react';

interface MovieDetails {
  title: string;
  name: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  vote_average: number;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/original';
const YOUTUBE_VIDEO_ID = 'jAmz1gEAJVY';

export default function MoviePage() {
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false); // State to control video playback
  const params = useParams();
  const { id } = params;

  useEffect(() => {
    if (!id) return;

    async function fetchMovieDetails() {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5001/api/content/movie/${id}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movie details');
        }
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  const youtubeOptions = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1, // Enable controls for the user
      rel: 0,
      showinfo: 0,
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900">
        Loading...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-900">
        Movie not found.
      </div>
    );
  }

  return (
    <div>
      <div className="relative h-screen bg-black">
        <AnimatePresence>
          {!isPlaying ? (
            // Show backdrop and play button initially
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <img
                src={`${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`}
                alt={movie.title || movie.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="flex items-center justify-center w-24 h-24 bg-neutral-900 bg-opacity-20 rounded-full backdrop-blur-sm border border-black border-opacity-30 hover:bg-opacity-30 transition-all duration-300"
                >
                  <PlayCircle className="h-12 w-12 text-red-800" />
                </button>
              </div>
            </motion.div>
          ) : (
            // Show YouTube player when isPlaying is true
            <motion.div
              key="youtube"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute top-0 left-0 w-full h-full"
            >
              <YouTube
                videoId={YOUTUBE_VIDEO_ID}
                opts={youtubeOptions}
                className="w-full h-full"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Movie details remain at the bottom */}
        <div className="absolute bottom-0 left-0 p-8 md:p-12 text-white bg-gradient-to-t from-black to-transparent w-full">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {movie.title || movie.name}
          </h1>
          <p className="text-lg max-w-2xl mb-4">{movie.overview}</p>
          <div className="flex items-center space-x-4 text-lg">
            <span>{movie.release_date?.substring(0, 4)}</span>
            <span className="font-bold text-green-400">
              Rating: {movie.vote_average.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
