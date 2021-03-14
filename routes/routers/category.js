const exjwt = require("express-jwt");
const express = require("express");
const jwt = require("jsonwebtoken");
const process = require("process");
const Category = require("./../../models/CourseCategory");

const keys = {
  jwtsecret: process.env.jwtsecret,
};

const ejwtauth = exjwt({ secret: keys.jwtsecret, algorithms: ["HS256"] });

const router = express.Router();
const { processValidationErrors, APIError } = require("../../helpers/error");
const { param, body } = require("express-validator");

router.post(
  "/category/add",
  body("name").escape(),
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const category = new Category({ name: req.body.name });
    category
      .addCategory()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
      })
      .catch(next);
  }
);

router.get(
  "/category/getAllCategory",
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const category = new Category({ name: req.body.name });
    category
      .getAllCategories()
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  }
);

module.exports = router;
