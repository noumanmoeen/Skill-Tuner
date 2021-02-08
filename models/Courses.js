const mongoose = require("mongoose");
const { APIError } = require("../helpers/error");
const { roles } = require("./../helpers/constant");

const coursesSchema = mongoose.Schema(
  {
    title: String,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Courses", coursesSchema);
