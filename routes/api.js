const express = require("express");
const router = express.Router();

const db = require("../db/database");

const userRouter = require("./routers/users");
const courseRouter = require("./routers/courses");

const quizRouter = require("./routers/quiz");
const contentRouter = require("./routers/contents");

const categoryRouter = require("./routers/category");

router.use([
  userRouter,
  courseRouter,
  quizRouter,
  contentRouter,
  categoryRouter,
]);

module.exports = router;
