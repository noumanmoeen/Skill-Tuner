const mongoose = require("mongoose");
const { APIError } = require("../helpers/error");
const { roles } = require("./../helpers/constant");
const _ = require("underscore");
const coursesSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    subject: String,
    skills: [
      {
        type: String,
        index: true,
      },
    ],
    duration: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
      },
    ],
    feedback: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        comment: {
          type: String,
        },
        ratings: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

coursesSchema.method("createCourse", async function () {
  const Courses = this.model("Courses");
  if ((await Courses.findOne({ title: this.title })) !== null) {
    throw new APIError(400, "Course with this title already exists");
  }
  return await Courses.create(this);
});

coursesSchema.method("getCourseByTitle", async function () {
  const Courses = this.model("Courses");
  return await Courses.findOne({ title: this.title });
});

coursesSchema.method("deleteCourseById", async function (_id) {
  return await this.model("Courses").deleteOne({ _id });
});

coursesSchema.method("deleteCourseByName", async function (title) {
  return await this.model("Courses").deleteOne({ title });
});

coursesSchema.method("searchBycourseId", async function () {
  return await this.model("Courses").findOne({ _id: this._id });
});

coursesSchema.method("addUserFeedBack", async function () {
  const course = await this.model("Courses").findOne({ _id: this._id });
  if (course == null) {
    throw new APIError(404, "there is no course with this id exists");
  }

  const user = _.find(course.feedback, (result) => {
    return result.userId.toString() == this.feedback[0].userId;
  });

  if (user != undefined) {
    return await this.model("Courses").updateOne(
      {
        _id: this._id,
        feedback: { $elemMatch: { userId: this.feedback[0].userId } },
      },
      { $set: { feedback: this.feedback[0] } },
      { multi: true }
    );
  }

  return await this.model("Courses").updateOne(
    { _id: this._id },
    { $push: { feedback: this.feedback } },
    { multi: true }
  );
});

coursesSchema.method("searchByTitle", async function () {
  return await this.model("Courses").find({
    title: { $regex: this.title },
  });
});

coursesSchema.method("getCourseContentById", async function () {
  const course = await this.model("Courses")
    .findOne({ _id: this._id })
    .select("content");
  if (course.length == 0) {
    throw new APIError(404, "Course with this id is not found");
  }
  return course;
});
module.exports = mongoose.model("Courses", coursesSchema);
