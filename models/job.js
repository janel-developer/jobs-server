const mongoose = require("mongoose");
const JobSchema = require('./jobSchema')

module.exports = mongoose.model("Job", JobSchema);