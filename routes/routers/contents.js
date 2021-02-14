const exjwt = require("express-jwt");
const express = require("express");
const jwt = require("jsonwebtoken");
const process = require("process");
const Course = require("./../../models/Courses");
const Quiz = require("./../../models/Quiz");
const Content = require("./../../models/Content");

const keys = {
  jwtsecret: process.env.jwtsecret,
};

const ejwtauth = exjwt({ secret: keys.jwtsecret, algorithms: ["HS256"] });

const router = express.Router();
const validateObjectID = require("mongoose").Types.ObjectId.isValid;
const { processValidationErrors, APIError } = require("../../helpers/error");
const { param, body } = require("express-validator");

router.post(
  "/content/addContent",
  body("title").escape(),
  //   todo:adding auth as a middleware
  //   ejwtauth,
  (req, res, next) => {
    const content = new Content(req.body);
    content
      .addnewContent()
      .then((data) => {
        res.send({ message: "Content added successfully" });
      })
      .catch(next);
  }
);

router.get(
  "/content/getContent/:_id",
  param("_id").escape().isString(),
  //   todo:adding auth as a middleware
  //   ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const content = new Content({ _id: req.params._id });
    content
      .getContentById()
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
