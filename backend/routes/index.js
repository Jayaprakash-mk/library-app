var express = require('express');
var router = express.Router();
var usersRouter = require('./users.js');
// const cors  = require('cors');
// const app = express();
// require('dotenv').config();
// app.use(express.json());
// app.use(cors());
router.use('/books', usersRouter);

// app.listen(8000, () => console.log("sever running"));
module.exports = router;
