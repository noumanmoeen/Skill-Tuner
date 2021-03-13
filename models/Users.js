const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { APIError } = require("../helpers/error");
const { roles, status, todoStatus } = require("./../helpers/constant");
const fs = require("fs");
const _ = require("underscore");

const userschema = mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    profilePicture: {
      data: Buffer,
      contentType: String,
    },
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
      default: roles.U,
      enum: [roles.A, roles.U],
    },
    status: {
      type: String,
      default: status.A,
      enum: [status.A, status.B],
    },
    skills: [{ type: String }],
    todolist: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        status: {
          type: String,
          default: todoStatus.C,
          enum: [todoStatus.C, todoStatus.IP, todoStatus.C, todoStatus.P],
        },
      },
    ],
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

  return await User.create(user);
});

userschema.method("addProfilePicture", async function (file) {
  let User = await this.model("User").findOne({ _id: this._id });
  if (User == null) {
    throw new APIError(404, "User with this id not found");
  }
  User.profilePicture.data = fs.readFileSync(file);
  User.profilePicture.contentType = "image/png";
  return await User.save();
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

userschema.method("updatePassword", async function (pswd) {
  const user = await this.model("User").findOne({ _id: this._id });
  if (user == null) {
    throw new APIError(404, "No User Found");
  }
  console.log(pswd);
  if (bcrypt.compareSync(pswd, user.pswd)) {
    return user.updateOne({ pswd: this.pswd });
  }
  throw new APIError(404, "old password is not match");
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

userschema.method("blockUserByID", async function () {
  const user = await this.model("User").findOne({ _id: this._id });
  if (user == null) {
    throw new APIError(404, "There is no user with this id");
  }

  return user.updateOne({ status: this.status });
});

// admin can create another admin
userschema.method("changeUserRoleToAdminByID", async function () {
  const user = await this.model("User").findOne({ _id: this._id });
  if (user == null) {
    throw new APIError(404, "There is no user with this id");
  }

  return user.updateOne({ role: roles.A });
});

userschema.method("addTaskInTodoList", async function () {
  const user = await this.model("User").findOne({ _id: this._id });
  if (user == null) {
    throw new APIError(404, "There is no user with this id");
  }

  const task = _.find(user.todolist, (result) => {
    if (result.title == undefined) {
      throw new APIError(404, "title is not present");
    }
    return result.title.toString() == this.todolist[0].title;
  });

  if (task != undefined) {
    throw new APIError(
      400,
      "there is already a task present in todo list with same title"
    );
  }
  return await this.model("User").updateOne(
    {
      _id: this._id,
    },
    { $push: { todolist: this.todolist } },
    { multi: true }
  );
});

userschema.method("getTodoList", async function () {
  const user = await this.model("User")
    .findOne({ _id: this._id })
    .select("todolist");
  if (user == null) {
    throw new APIError(404, "There is no user with this id");
  }
  return user;
});

userschema.method("deleteTodoListTask", async function () {
  const user = await this.model("User").findOne({ _id: this._id });
  if (user == null) {
    throw new APIError(404, "There is no user with this id");
  }

  const task = _.find(user.todolist, (result) => {
    return result.title.toString() == this.todolist[0].title;
  });

  if (task != undefined) {
    return await this.model("User").updateOne(
      {
        _id: this._id,
        todolist: { $elemMatch: { _id: this.todolist[0]._id } },
      },
      { $pull: { todolist: this.todolist[0] } },
      { multi: true }
    );
  }
  throw new APIError(
    404,
    "There is no task with same title please create a new one"
  );
});
// get all users except admins and user who call it.
userschema.method("getAllUsers", async function () {
  const user = await this.model("User")
    .find({
      _id: { $ne: this._id },
      role: { $ne: roles.A },
    })
    .select(["firstname", "lastname", "email", "role", "status", "username"]);

  return user;
});

module.exports = mongoose.model("User", userschema);
