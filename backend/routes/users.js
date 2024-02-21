var express = require('express');
var router = express.Router();
const {getAllBooks, addNewBook} = require('../controller/books.js');


/* GET users listing. */
router.get('/', getAllBooks);
router.post('/addBook', addNewBook)

module.exports = router;
