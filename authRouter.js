const Router = require('express');
const router = new Router();
const controller = require('./authController');
const { check } = require("express-validator");

router.post('/registration', [
  check('username', "The username can have from 2 to 24 characters").isLength({ min: 2, max: 24 }),
  check('password', "The password can have from 6 to 18 characters").isLength({ min: 6, max: 18 })
], controller.registration);
router.post('/login', controller.login);
router.get('/users', controller.getUsers);

module.exports = router;