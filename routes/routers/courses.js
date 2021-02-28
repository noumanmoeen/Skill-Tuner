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
const { data } = require("../../helpers/logger");

router.post(
  "/courses/add",
  body("title").escape(),
  body("subject").escape(),
  //   todo:adding auth as a middleware
  ejwtauth,
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

router.get(
  "/courses/searchById/:_id",
  param("_id", "Invalid Object ID")
    .escape()
    .custom((value) => validateObjectID(value)),
  processValidationErrors,
  ejwtauth,
  (req, res, next) => {
    const course = new Course({ _id: req.params._id });
    course
      .searchBycourseId()
      .then((data) => {
        if (data.length == 0) {
          throw new APIError(404, "There is no course with this id");
        }
        res.send(data);
      })
      .catch(next);
  }
);

router.get(
  "/courses/searchByName/:name",
  param("name").escape(),
  processValidationErrors,
  ejwtauth,
  (req, res, next) => {
    const course = new Course({ title: req.params.name });
    course
      .searchByTitle()
      .then((data) => {
        if (data.length == 0) {
          throw new APIError(404, "There is no course with this title");
        }
        res.send(data);
      })
      .catch(next);
  }
);

router.get(
  "/courses/getContentById/:_id",
  param("_id", "Invalid Object ID")
    .escape()
    .custom((value) => validateObjectID(value)),
  processValidationErrors,
  ejwtauth,
  (req, res, next) => {
    const course = new Course({ _id: req.params._id });
    course
      .getCourseContentById()
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  }
);

router.post(
  "/courses/addFeedback",
  // ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const course = new Course({
      _id: req.body.course_id,
      feedback: {
        userId: req.body.user_id,
        comment: req.body.comment,
        ratings: req.body.ratings,
      },
    });

    course
      .addUserFeedBack()
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  }
);

module.exports = router;
