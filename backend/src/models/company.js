const Mongoose = require("mongoose");

const { Schema } = Mongoose;

const CompanySchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  logotype: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  vacancy: [
    {
      type: Schema.Types.ObjectId,
      ref: "Vacancy",
    },
  ],
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Mongoose.model("Company", CompanySchema);
