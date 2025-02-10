const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const VacancySchema = new Schema({
  title: {
    type: String,
    trim: true,
  },
  leastSalary: {
    type: String,
  },
  highestSalary: {
    type: String,
  },
  hardSkills: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },
  response: [
    {
      type: Schema.Types.ObjectId,
      ref: "Response",
    },
  ],
  lastUpdate: {
    type: Date,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Vacancy", VacancySchema);
