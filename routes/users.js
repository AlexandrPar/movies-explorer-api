const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const BadRequestError = require('../errors/BadRequestError');

const {
  updateUser,
  getUserMe,
} = require('../controllers/users');

router.get('/users/me', getUserMe);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  })
    .unknown(false),
}), updateUser);


module.exports = router;
