var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const { handleErrors } = require("./helpers/error");
// var multer = require("multer");
var indexRouter = require("./routes/index");
// var usersRouter = require('./routes/users');
const apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "upload/images")));
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use(handleErrors);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// upload images in server
// app.use(
//   multer({
//     dest: "./uploads/Images/",
//     rename: function (filename) {
//       return filename;
//     },
//   }).any()
// );

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
