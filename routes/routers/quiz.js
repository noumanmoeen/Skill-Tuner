const exjwt = require("express-jwt");
const express = require("express");
const jwt = require("jsonwebtoken");
const process = require("process");
const Course = require("./../../models/Courses");
const Question = require("./../../models/Questions");
const Quiz = require("./../../models/Quiz");

const keys = {
  jwtsecret: process.env.jwtsecret,
};

const ejwtauth = exjwt({ secret: keys.jwtsecret, algorithms: ["HS256"] });

const router = express.Router();
const validateObjectID = require("mongoose").Types.ObjectId.isValid;
const { processValidationErrors, APIError } = require("../../helpers/error");
const { param, body } = require("express-validator");

router.post(
  "/Quiz/add",
  body("title").escape(),
  //   todo:adding auth as a middleware
  //   ejwtauth,
  (req, res, next) => {
    const quiz = new Quiz(req.body);
    quiz
      .createQuiz(this.quiz)
      .then((data) => {
        res.send({ message: "Quiz created successfully" });
      })
      .catch(next);
  }
);

router.get(
  "/Quiz/getQuiz/:_id",
  param("_id").escape().isString(),
  //   todo:adding auth as a middleware
  //   ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const quiz = new Quiz({ _id: req.params._id });
    quiz
      .getQuizById()
      .then((data) => {
        if (data != null) {
          res.send(data);
        } else {
          next(new APIError(400, "No Quiz found with this id"));
        }
      })
      .catch(next);
  }
);

module.exports = router;
