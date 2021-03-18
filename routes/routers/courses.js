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
const { request } = require("../../app");
const fs = require("fs");
const multer = require("multer");
const uuid = require("uuid").v4;
storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/Images/");
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuid() + "-" + fileName);
  },
});

upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post(
  "/courses/add",
  body("title").escape(),
  body("subject").escape(),
  //   todo:adding auth as a middleware
  upload.single("coverPicture"),
  ejwtauth,
  (req, res, next) => {
    let course = new Course({
      title: req.body.title,
      subject: req.body.subject,
      skills: req.body.skills,
      duration: req.body.duration,
      description: req.body.description,
      category: req.body.category,
      coverPicture: "/uploads/Images/" + req.file.filename,
    });

    course
      .createCourse()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
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
  "/courses/getAllCourses",
  processValidationErrors,
  ejwtauth,
  (req, res, next) => {
    const course = new Course();
    course
      .getAllCourses()
      .then((data) => {
        if (data.length == 0) {
          throw new APIError(404, "There are no courses Available");
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

router.delete(
  "/course/delete/:_id",
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const course = new Course({ _id: req.params._id });
    course
      .deleteCourseById()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
      })
      .catch(next);
  }
);

router.post(
  "/courses/addFeedback",
  ejwtauth,
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

router.post(
  "/courses/addContent",
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const course = new Course({
      _id: req.body._id,
      content: {
        title: req.body.title,
        type: req.body.type,
        url: req.body.url,
        learningObjective: req.body.learningObjective,
        resources: req.body.resources,
        lectureNo: req.body.lectureNo,
        description: req.body.description,
      },
    });

    course
      .addContentInCourseById()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
      })
      .catch(next);
  }
);

module.exports = router;
