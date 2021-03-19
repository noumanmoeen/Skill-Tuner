const express = require("express");
const router = express.Router();

const db = require("../db/database");

const userRouter = require("./routers/users");
const courseRouter = require("./routers/courses");

const categoryRouter = require("./routers/category");

router.use([userRouter, courseRouter, categoryRouter]);

module.exports = router;
