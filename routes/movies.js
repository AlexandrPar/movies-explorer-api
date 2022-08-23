const router = require('express').Router();
const validator = require('validator');
const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/BadRequestError');

const {
  getMovies,
  addMovies,
  deleteMovies,
} = require('../controllers/cards');


router.get('/movies', getMovies);

router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    image: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат URL адреса');
      }
      return value;
    }),
    trailerLink: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат URL адреса');
      }
      return value;
    }),
    thumbnail: Joi.string().custom((value) => {
      if (!validator.isURL(value, { require_protocol: true })) {
        throw new BadRequestError('Неправильный формат URL адреса');
      }
      return value;
    }),
  }),
}), addMovies);

router.delete('/movies/:movieId', celebrate({
  params: Joi.object().keys({
    moviesId: Joi.string().hex().length(24).required(),
  }),
}), deleteMovies);

module.exports = router;