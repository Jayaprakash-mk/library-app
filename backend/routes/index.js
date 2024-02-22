var express = require('express');
var router = express.Router();
var usersRouter = require('./users.js');

router.use('/books', usersRouter);

module.exports = router;
