const mongoose = require("mongoose");
const { Schema } = mongoose;

const questionSchema = new Schema({
  text: { type: String, required: true },
  choices: {
    type: [String],
    required: true,
  },
  correctAnsIndex: {
    type: Number,
    required: true,
  },
  answerDescription: String,
  marks: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
