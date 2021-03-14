const mongoose = require("mongoose");
const { APIError } = require("../helpers/error");
const coursesCategorySchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

coursesCategorySchema.method("addCategory", async function () {
  const Category = this.model("Category");
  if ((await Category.findOne({ name: this.name })) !== null) {
    throw new APIError(400, "Category already exists");
  }
  return await Category.create(this);
});

coursesCategorySchema.method("getAllCategories", async function () {
  return await this.model("Category").find({});
});

module.exports = mongoose.model("Category", coursesCategorySchema);
