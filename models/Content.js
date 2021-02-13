const mongoose = require("mongoose");
const validator = require("validator");
const { APIError } = require("../helpers/error");
const { contentType } = require("./../helpers/constant");

const contentSchema = mongoose.Schema(
  {
    title: String,
    type: {
      type: String,
      default: contentType.L,
      enum: [contentType.T, contentType.V, contentType.L],
    },
    quiz: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz",
      },
    ],
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

contentSchema.method("addnewContent", async function () {
  return await this.model("Content").create(this);
});

contentSchema.method("deleteContentById", async function (_id) {
  return await this.model("Content").deleteOne({ _id });
});

contentSchema.method("getContentById", async function () {
  return await this.model("Content").findOne({ _id: this._id });
});

module.exports = mongoose.model("Content", contentSchema);
