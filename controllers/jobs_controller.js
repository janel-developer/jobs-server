const jobs = require('../data/jobData')

function getJobs(req, res) {
	res.send(jobs)
}

module.exports = {
	getJobs
}