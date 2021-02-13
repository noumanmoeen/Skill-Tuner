const exjwt = require("express-jwt");
const express = require("express");
const jwt = require("jsonwebtoken");
const process = require("process");
const Course = require("./../../models/Courses");
const Question = require("./../../models/Questions");

const keys = {
  jwtsecret: process.env.jwtsecret,
};

const ejwtauth = exjwt({ secret: keys.jwtsecret, algorithms: ["HS256"] });

const router = express.Router();
const validateObjectID = require("mongoose").Types.ObjectId.isValid;
const { processValidationErrors, APIError } = require("../../helpers/error");
const { param, body } = require("express-validator");

router.post(
  "/questions/add",
  body("questionText").escape(),
  //   todo:adding auth as a middleware
  //   ejwtauth,
  (req, res, next) => {
    const question = new Question(req.body);
    question
      .createQuestion(this.question)
      .then((data) => {
        res.send({ message: "Question added successfully" });
      })
      .catch(next);
  }
);

router.get(
  "/questions/getQuestion/:_id",
  param("_id").escape().isString(),
  //   todo:adding auth as a middleware
  //   ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const question = new Question({ _id: req.params._id });
    question
      .getQuestionById()
      .then((data) => {
        if (data != null) {
          res.send(data);
        } else {
          next(new APIError(400, "No question found with this id"));
        }
      })
      .catch(next);
  }
);

module.exports = router;
