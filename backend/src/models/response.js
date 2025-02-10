const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const ResponseSchema = new Schema({
  description: {
    type: String,
  },
  skills: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  vacancy: {
    type: Schema.Types.ObjectId,
    ref: "Vacancy",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Response", ResponseSchema);
