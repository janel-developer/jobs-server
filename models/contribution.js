const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JobSchema = require("./jobSchema")

const Contribution = new Schema ({
	job: {type: JobSchema, required: true},
	date: {type: Date, required: true}
});

module.exports = mongoose.model("Contribution", Contribution);