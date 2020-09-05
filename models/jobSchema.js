const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema ({
	name: {type: String, required: true},
	category: {type: String, required: true},
	description: {type: String, required: true},
	frequency: {type: Number, required: true},
	units: {type: Number, required: true}
});

module.exports = JobSchema