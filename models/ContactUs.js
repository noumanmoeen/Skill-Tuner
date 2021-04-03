const mongoose = require("mongoose");
const { APIError } = require("../helpers/error");
const contactUsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    designation: { type: String, require: true },
    email: { type: String, require: true },
    phoneno: { type: String, require: true },
    message: { type: String },
  },
  {
    timestamps: true,
  }
);

contactUsSchema.method("addRecord", async function () {
  const contact = this.model("ContactUs");

  return await contact.create(this);
});

module.exports = mongoose.model("ContactUs", contactUsSchema);
