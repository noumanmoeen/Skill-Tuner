const exjwt = require("express-jwt");
const express = require("express");
const jwt = require("jsonwebtoken");
const process = require("process");
const Course = require("./../../models/Courses");

const keys = {
  jwtsecret: process.env.jwtsecret,
};

const ejwtauth = exjwt({ secret: keys.jwtsecret, algorithms: ["HS256"] });

const router = express.Router();
const validateObjectID = require("mongoose").Types.ObjectId.isValid;
const { processValidationErrors, APIError } = require("../../helpers/error");
const { param, body } = require("express-validator");

router.post(
  "/courses/add",
  body("title").escape(),
  body("subject").escape(),
  //   todo:adding auth as a middleware
  //   ejwtauth,
  (req, res, next) => {
    let course = new Course(req.body);
    course
      .createCourse()
      .then((data) => {
        res.send({ message: "course registered" });
      })
      .catch(next);
  }
);

module.exports = router;
