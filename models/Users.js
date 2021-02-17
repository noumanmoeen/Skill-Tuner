const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { APIError } = require("../helpers/error");
const { roles } = require("./../helpers/constant");

const userschema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    username: {
      type: String,
      index: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      validate: function (value) {
        return validator.isEmail(value);
      },
    },
    pswd: {
      type: String,
      required: true,
      set: function (value) {
        return bcrypt.hashSync(value, 10);
      },
      phone: {
        type: String,
        unique: true,
      },
    },
    role: {
      type: String,
      default: "User",
      enum: [roles.A, roles.U],
    },
    skills: [{ type: String }],
    courses: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Courses",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

userschema.method("createUser", async function (user) {
  let User = this.model("User");
  if ((await User.findOne({ email: user.email })) !== null) {
    throw new APIError(400, "User with this email already exists");
  }
  if ((await User.findOne({ username: user.username })) !== null) {
    throw new APIError(400, "User with this username already exists");
  }

  if ((await User.findOne({ reg_no: user.reg_no })) !== null) {
    throw new APIError(400, "User with this registeration no already exists");
  }

  return await User.create(user);
});

userschema.method("checkIfUserWithEmailExists", async function (email) {
  let User = this.model("User");
  let user = await User.findOne({ email });

  if (user == null) {
    throw new APIError(404, "No user with this email exists");
  }
  return user;
});

userschema.method("checkUserRole", async function () {
  let User = this.model("User");
  let user = await User.findOne({ _id: this._id, role: this.role });
  if (user == null) {
    return false;
  }
  return true;
});

userschema.method("checkIfUserWithUsernameExists", async function (username) {
  let User = this.model("User");
  return await User.findOne({ username }).select("username");
});

userschema.method("getUser", async function (_id) {
  let User = this.model("User");
  let user = await User.findOne({ _id }).select("-pswd");
  if (!user) {
    throw new APIError(404, "No user found");
  }
  return user;
});

userschema.method("checkPass", function (user, pswd) {
  return bcrypt.compareSync(pswd, user.pswd);
});

userschema.method("deleteUser", async function (_id) {
  return await this.model("User").deleteOne({ _id });
});

userschema.method("addNewCourseByUserID", async function () {
  const user = this.model("User");
  if ((await user.findOne({ _id: this._id, courses: this.courses })) != null) {
    throw new APIError(404, "User already registered in this course");
  }
  return await user.updateOne(
    { _id: this._id },
    { $push: { courses: this.courses } }
  );
});

userschema.method("dropCourseByUserID", async function () {
  const user = this.model("User");
  if ((await user.findOne({ _id: this._id, courses: this.courses })) == null) {
    throw new APIError(404, "User is not registered in this course");
  }
  return await user.updateOne(
    { _id: this._id },
    { $pull: { courses: this.courses[0] } },
    { multi: true }
  );
});

userschema.method("addSkill", async function () {
  const user = this.model("User");
  if ((await user.findOne({ _id: this._id, skills: this.skills })) != null) {
    throw new APIError(404, "Already a skill present in profile");
  }

  return await user.updateOne(
    { _id: this._id },
    { $push: { skills: this.skills } },
    { multi: true }
  );
});

userschema.method("viewEnrollCourses", async function () {
  const user = this.model("User");
  if ((await user.findOne({ _id: this._id })) == null) {
    throw new APIError(404, "There is no user with this id");
  }

  return await user.findOne({ _id: this._id }).select("courses");
});
module.exports = mongoose.model("User", userschema);
