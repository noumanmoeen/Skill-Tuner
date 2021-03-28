const mongoose = require("mongoose");
const { APIError } = require("../helpers/error");
const { roles, contentType } = require("./../helpers/constant");
const _ = require("underscore");
const coursesSchema = mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    subject: String,
    coverPicture: {
      type: String,
    },
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
        title: String,
        type: {
          type: String,
          default: contentType.L,
          enum: [contentType.T, contentType.V, contentType.L],
        },
        url: {
          type: String,
        },
        learningObjective: { type: String },
        resources: { type: String },
        lectureNo: { type: String },
        description: {
          type: String,
        },
      },
    ],
    quiz: [
      {
        title: String,

        questions: [
          {
            questionText: { type: String, required: true },
            choices: [
              {
                type: String,
                required: true,
              },
            ],
            correctAnswer: {
              type: String,
              required: true,
            },

            marks: {
              type: Number,
              required: true,
            },
          },
        ],
        description: String,
        totalMarks: {
          type: Number,
          required: true,
        },
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
coursesSchema.method("getAllCourses", async function () {
  return await this.model("Courses").find({}).populate("category");
});

coursesSchema.method("deleteCourseById", async function () {
  if ((await this.model("Courses").findOne({ _id: this._id })) == null) {
    throw new APIError(400, "There is no course with this id");
  }
  return await this.model("Courses").deleteOne({ _id: this._id });
});

coursesSchema.method("addContentInCourseById", async function () {
  if ((await this.model("Courses").findOne({ _id: this._id })) == null) {
    throw new APIError(400, "There is no course with this id");
  }

  const data = await this.model("Courses")
    .findOne({ _id: this._id })
    .select({ content: { $elemMatch: { title: this.content[0].title } } });

  if (data.content.length != 0) {
    throw new APIError(
      400,
      "Already a content with this title is present please change this title"
    );
  }
  return await this.model("Courses").updateOne(
    { _id: this._id },
    { $push: { content: this.content[0] } }
  );
});

coursesSchema.method("deleteCourseContentByCourseId", async function (id) {
  if ((await this.model("Courses").findOne({ _id: this._id })) == null) {
    throw new APIError(400, "There is no course with this id");
  }

  const data = await this.model("Courses")
    .findOne({ _id: this._id })
    .select({ content: { $elemMatch: { _id: id } } });

  console.log(data);
  if (data.content.length == 0) {
    throw new APIError(400, "There is no content with this id");
  }
  return await this.model("Courses").updateOne(
    { _id: this._id },
    { $pull: { content: { _id: id } } },
    { multi: true }
  );
});

coursesSchema.method("addQuizInCourseById", async function () {
  if ((await this.model("Courses").findOne({ _id: this._id })) == null) {
    throw new APIError(400, "There is no course with this id");
  }

  const data = await this.model("Courses")
    .findOne({ _id: this._id })
    .select({ quiz: { $elemMatch: { title: this.quiz[0].title } } });

  if (data.quiz.length != 0) {
    throw new APIError(
      400,
      "Already a Quiz with this title is present please change this title"
    );
  }
  return await this.model("Courses").updateOne(
    { _id: this._id },
    { $push: { quiz: this.quiz[0] } }
  );
});

coursesSchema.method("deleteCourseByName", async function (title) {
  return await this.model("Courses").deleteOne({ title });
});

coursesSchema.method("searchBycourseId", async function () {
  return await this.model("Courses")
    .findOne({ _id: this._id })
    .populate(["content", "quiz", "feedback", "category"]);
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

coursesSchema.method("getCoursesByCategoryId", async function () {
  const course = await this.model("Courses").find({ category: this.category });
  if (course.length == 0) {
    throw new APIError(404, "Course with this id is not found");
  }
  return course;
});

module.exports = mongoose.model("Courses", coursesSchema);
