const Mongoose = require("mongoose");

const { ROLES, EMAIL_PROVIDER } = require("../constants");

const { Schema } = Mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
  },
  username: {
    type: String,
  },
  middlename: {
    type: String,
  },
  password: {
    type: String,
  },
  avatar: {
    type: String,
  },
  yandexId: {
    type: String,
  },
  vkontakteId: {
    type: String,
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    default: null,
  },
  response: [
    {
      type: Schema.Types.ObjectId,
      ref: "Response",
    },
  ],
  ban: {
    type: Schema.Types.ObjectId,
    ref: "Ban",
  },
  report: [
    {
      type: Schema.Types.ObjectId,
      ref: "Report",
    },
  ],
  role: {
    type: String,
    default: ROLES.User,
    enum: [ROLES.Admin, ROLES.User, ROLES.Employer],
  },
  confirmed: {
    type: Boolean,
    default: false,
  },
  confirmationToken: { type: String },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("User", UserSchema);
