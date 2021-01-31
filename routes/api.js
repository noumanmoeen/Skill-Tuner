const express = require("express");
const router = express.Router();

const db = require("../db/database");

const userRouter = require("./routers/users");
router.use([userRouter]);

module.exports = router;
