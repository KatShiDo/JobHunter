const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const BanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reason: { type: String },
  expiresAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = Mongoose.model("Ban", BanSchema);
