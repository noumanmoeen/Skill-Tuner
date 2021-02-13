const mongoose = require("mongoose");
const validator = require("validator");
const { APIError } = require("../helpers/error");
const { contentType } = require("./../helpers/constant");

const quizSchema = mongoose.Schema(
  {
    title: String,

    questions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Question",
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

module.exports = mongoose.model("Quiz", quizSchema);
