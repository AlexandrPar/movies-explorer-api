const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenAccessError = require('../errors/ForbiddenAccessError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movie) => res.send(movie))
    .catch((err) => {
      next(err);
    });
};

const addMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => res.status(201).send(movie))
    .catch((err) => {
      if (err.name === 'BadRequestError') {
        next(new BadRequestError('Переданы некорректные данные'));
      }
      next(err);
    });
};

const deleteMovies = (req, res, next) => {
  const { movieId } = req.params;
  const userId = req.user._id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      }
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenAccessError('У вас нет доступа');
      } else {
        Movie.findByIdAndRemove(movieId)
          .then(() => {
            res.send({ messege: 'Фильм удален' });
          });
      }
    })
    .catch((err) => {
      if (err.name === 'BadRequestError' || err.name === 'CastError') {
        throw new BadRequestError('Введены некорректные данные');
      }
      next(err);
    });
};

module.exports = {
  getMovies,
  addMovies,
  deleteMovies,
};