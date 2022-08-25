const router = require('express').Router();
const { updateUserValidation } = require('../utils/validations');

const {
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/users/me', getUser);

router.patch('/users/me', updateUserValidation, updateUser);

module.exports = router;
