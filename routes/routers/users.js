const exjwt = require("express-jwt");
const express = require("express");
const jwt = require("jsonwebtoken");
const process = require("process");
const User = require("./../../models/Users");
const { status } = require("./../../helpers/constant");

const keys = {
  jwtsecret: process.env.jwtsecret,
};

const ejwtauth = exjwt({ secret: keys.jwtsecret, algorithms: ["HS256"] });

const router = express.Router();
const validateObjectID = require("mongoose").Types.ObjectId.isValid;
const { processValidationErrors, APIError } = require("../../helpers/error");
const { param, body } = require("express-validator");

/*
  --------
  Create
  --------
*/

router.post(
  "/users/register",
  body("firstname").escape(),
  body("lastname").escape(),
  body(
    "username",
    "Username is required and only alpha numeric characters are allowed"
  ).isAlphanumeric(),
  body("email", "Email is required").isEmail().normalizeEmail(),
  body(
    "pswd",
    "Password is required, must contain atleast 6 characters, and must be a string."
  )
    .isLength({ min: 6 })
    .isString(),

  (req, res, next) => {
    let user = new User();
    user
      .createUser(req.body)
      .then((data) => {
        res.send({ message: "User registered" });
      })
      .catch(next);
  }
);

router.post(
  "/users/addProfilePicture",
  body("_id").escape(),
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const user = new User({ _id: req.body._id });
    user
      .addProfilePicture(req.files.profilePicture.path)
      .then((data) => {
        res.sendStatus(204);
      })
      .catch(next);
  }
);

/*
  --------
  Read
  --------
*/

router.post(
  "/users/login",
  body("email", "Email is required and must be a valid mail")
    .isEmail()
    .normalizeEmail(),
  body(
    "pswd",
    "Password is required, must contain atleast 6 characters, and must be a string."
  )
    .isLength({ min: 6 })
    .isString(),
  processValidationErrors,
  (req, res, next) => {
    let user = new User();
    user
      .checkIfUserWithEmailExists(req.body.email)
      .then((_user) => {
        // verify password
        if (user.checkPass(_user, req.body.pswd)) {
          console.log("this is the user login = ", _user.id);
          user = new User({ _id: _user.id, role: req.body.role });
          user.checkUserRole(this.user).then((data) => {
            console.log("the data", data);
            if (data) {
              let token = jwt.sign(
                {
                  _id: _user._id,
                  username: _user.username,
                  role: _user.role,
                },
                keys.jwtsecret
              );
              // TODO: never expiring tokens
              res.send({
                _id: _user._id,
                token,
                message: "Keep it safe :)",
              });
            } else {
              next(new APIError(400, "Invalid role"));
            }
          });
        } else {
          next(new APIError(400, "Invalid Password"));
        }
      })
      .catch(next);
  }
);

router.get(
  "/users/:id",
  param("id", "Invalid Object ID")
    .escape()
    .custom((value) => validateObjectID(value)),
  processValidationErrors,
  (req, res, next) => {
    let user = new User();
    user
      .getUser(req.params.id)
      .then((data) => res.send(data))
      .catch(next);
  }
);

router.get(
  "/users/checkusername/:username",
  param("username").escape().isString(),
  processValidationErrors,
  (req, res, next) => {
    let user = new User({ username: req.params.username });
    user
      .checkIfUserWithUsernameExists()
      .then((data) => res.send(data ? 200 : 400))
      .catch(next);
  }
);

// router.get(
//   "/users/checkrole/:role/:_id",
//   param("role").escape().isString(),
//   param("_id").escape().isString(),
//   processValidationErrors,
//   (req, res, next) => {
//     let user = new User({ _id: req.params._id, role: req.params.role });
//     user.checkUserRole(this.user).then((data) => {
//       res.send(data);
//     });
//   }
// );

router.post(
  "/users/courses/add/",
  body("_id").escape(),
  body("courseId").escape(),
  processValidationErrors,
  ejwtauth,
  (req, res, next) => {
    const user = new User({
      _id: req.body._id,
      courses: { _id: req.body.courseId },
    });
    user
      .addNewCourseByUserID()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
      })
      .catch(next);
  }
);

router.post(
  "/users/courses/drop/",
  body("_id").escape(),
  body("courseId").escape(),
  processValidationErrors,
  ejwtauth,
  (req, res, next) => {
    const user = new User({
      _id: req.body._id,
      courses: { _id: req.body.courseId },
    });
    user
      .dropCourseByUserID()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
      })
      .catch(next);
  }
);

router.post(
  "/users/addSkill/",
  body("_id").escape(),

  processValidationErrors,
  ejwtauth,
  (req, res, next) => {
    console.log(req.body.skills);
    const user = new User({
      _id: req.body._id,
      skills: req.body.skills,
    });
    user
      .addSkill()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
      })
      .catch(next);
  }
);

router.get(
  "/users/getEnrollCourses/:_id",
  param("_id", "Invalid Object ID")
    .escape()
    .custom((value) => validateObjectID(value)),
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    let user = new User({ _id: req.params._id });
    user
      .viewEnrollCourses()
      .then((data) => res.send(data))
      .catch(next);
  }
);

router.post(
  "/users/blockUser",
  body("_id").escape(),

  ejwtauth,
  (req, res, next) => {
    let user = new User({ _id: req.body._id, status: status.B });

    user
      .blockUserByID()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
      })
      .catch(next);
  }
);

// adding tasks in to do list
router.post(
  "/users/todoTask/add",
  body("_id").escape(),
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const user = new User({ _id: req.body._id, todolist: req.body.todolist });
    user
      .addTaskInTodoList()
      .then((data) => {
        res.sendStatus(data ? 200 : 400);
      })
      .catch(next);
  }
);

// get all to do list tasks
router.get(
  "/users/todoTask/get/:_id",
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const user = new User({ _id: req.params._id });
    user
      .getTodoList()
      .then((data) => {
        res.send(data);
      })
      .catch(next);
  }
);

// delete a list task based upon task id
router.delete(
  "/users/:_id/todoTask/delete/:Tid",
  ejwtauth,
  processValidationErrors,
  (req, res, next) => {
    const user = new User({
      _id: req.params._id,
      todolist: { _id: req.params.Tid },
    });
    user
      .deleteTodoListTask()
      .then((data) => {
        res.send(data ? 200 : 400);
      })
      .catch(next);
  }
);

module.exports = router;
