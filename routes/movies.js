const router = require('express').Router();
const validator = require('validator');
const { addMoviesValidation, movieIdValidation } = require('../utils/validations');
const BadRequestError = require('../errors/BadRequestError');

const {
  getMovies,
  addMovies,
  deleteMovies,
} = require('../controllers/movies');


router.get('/movies', getMovies);

router.post('/movies', addMoviesValidation, addMovies);

router.delete('/movies/:movieId',  movieIdValidation, deleteMovies);

module.exports = router;