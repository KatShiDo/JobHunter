const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const ReportSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reason: {
    type: String,
  },
  reasonUrl: {
    type: String,
  },
});

module.exports = Mongoose.model("Report", ReportSchema);
