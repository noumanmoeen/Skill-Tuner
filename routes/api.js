const express = require("express");
const router = express.Router();

const db = require("../db/database");

const userRouter = require("./routers/users");
const courseRouter = require("./routers/courses");
const questionRouter = require("./routers/questions");
const quizRouter = require("./routers/quiz");

router.use([userRouter, courseRouter, questionRouter, quizRouter]);

module.exports = router;
