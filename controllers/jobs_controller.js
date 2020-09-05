const Job = require('../models/job')

function getJobs(req, res) {
	Job.find().exec((error,jobs) => {
		if(error || !jobs) {
			res.status(500)
			const errorMessage = error ? error.message : "No jobs found"
			res.send(errorMessage)
		}
		else {
			console.log("got jobs", jobs)
			res.send(jobs)
		}
	})
}

module.exports = {
	getJobs
}