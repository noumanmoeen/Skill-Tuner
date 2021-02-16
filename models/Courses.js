const mongoose = require("mongoose");
const { APIError } = require("../helpers/error");
const { roles } = require("./../helpers/constant");

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
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Content",
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

coursesSchema.method("searchByTitle", async function () {
  return await this.model("Courses").find({
    title: { $regex: this.title },
  });
});
module.exports = mongoose.model("Courses", coursesSchema);
