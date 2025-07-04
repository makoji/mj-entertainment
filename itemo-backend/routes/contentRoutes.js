// routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const {
  getTrending,
  getNetflixOriginals,
  getTopRated,
  getActionMovies,
  getMovieDetails,
} = require('../controllers/contentController');

router.get('/trending', getTrending);
router.get('/netflix-originals', getNetflixOriginals);
router.get('/top-rated', getTopRated);
router.get('/action', getActionMovies);
router.get('/movie/:id', getMovieDetails);

module.exports = router;
