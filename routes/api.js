const express = require("express");
const router = express.Router();

const db = require("../db/database");

const userRouter = require("./routers/users");
const courseRouter = require("./routers/courses");

const categoryRouter = require("./routers/category");
const paymentApi = require("./routers/JazzCash");

router.use([userRouter, courseRouter, categoryRouter, paymentApi]);

module.exports = router;
