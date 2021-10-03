const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.methods.matchPassword = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
