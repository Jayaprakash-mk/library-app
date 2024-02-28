var express = require('express');
var router = express.Router();
const {getUser, createUser} = require('../controller/userLogins.js');
const {validate, signUpValidator} = require('../utils/validator.js');

/* GET users listing. */
router.post('/login', getUser);
router.post('/signup', createUser)

module.exports = router;
