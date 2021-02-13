const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
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
});

questionSchema.method("createQuestion", async function () {
  return await this.model("Question").create(this);
});

questionSchema.method("deleteQuestionById", async function (_id) {
  return await this.model("Question").deleteOne({ _id });
});

questionSchema.method("getQuestionById", async function () {
  return await this.model("Question").findOne({ _id: this._id });
});
module.exports = mongoose.model("Question", questionSchema);
