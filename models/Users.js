const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const { APIError } = require("../helpers/error");
const { roles } = require("./../../helpers/constant");

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

userschema.method("checkUserRole", async function (user) {
  let User = this.model("User");
  let user = await User.findOne({ _id: user._id, role: user.role });

  if (user == null) {
    throw new APIError(404, "No user with this role found");
  }
  return user;
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

module.exports = mongoose.model("User", userschema);
