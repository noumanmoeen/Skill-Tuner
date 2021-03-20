const mongoose = require("mongoose");
const validator = require("validator");
const { APIError } = require("../helpers/error");
const { contentType } = require("./../helpers/constant");

const quizSchema = mongoose.Schema(
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
        answerDescription: String,
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
  {
    timestamps: true,
  }
);

quizSchema.method("createQuiz", async function () {
  return await this.model("Quiz").create(this);
});

quizSchema.method("deleteQuizById", async function (_id) {
  return await this.model("Quiz").deleteOne({ _id });
});

quizSchema.method("getQuizById", async function () {
  return await this.model("Quiz").findOne({ _id: this._id });
});

module.exports = mongoose.model("Quiz", quizSchema);
