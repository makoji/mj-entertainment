// controllers/contentController.js
const axios = require('axios');

// IMPORTANT:  TMDb API key
const TMDB_API_KEY = '91839eee00894e9d158d88653d84ed4a';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// @desc    Fetch trending movies
// @route   GET /api/content/trending
const getTrending = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/trending/movie/week?api_key=${TMDB_API_KEY}`
    );
    res.json(data.results);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while fetching trending movies' });
  }
};

// @desc    Fetch Netflix originals
// @route   GET /api/content/netflix-originals
const getNetflixOriginals = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_networks=213`
    );
    res.json(data.results);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while fetching Netflix originals' });
  }
};

const getTopRated = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US`
    );
    res.json(data.results);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while fetching top rated movies' });
  }
};

//   Fetch Action movies
//   GET /api/content/action
const getActionMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=28`
    );
    res.json(data.results);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while fetching action movies' });
  }
};

const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = await axios.get(
      `${TMDB_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
    );
    res.json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Server error while fetching movie details' });
  }
};

module.exports = {
  getTrending,
  getNetflixOriginals,
  getTopRated,
  getActionMovies,
  getMovieDetails,
};
