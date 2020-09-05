const Job = require('../models/job')
const Contribution = require('../models/contribution')

function sendError(res, message) {
	res.status(500);
	res.send(message);
}

function getContributions(req, res) {
	Contribution.find().exec((error, contributions) => {
		if(error) {
			sendError(res, error.message);
		}
		else {
			res.send(contributions);
		}
	})
}

function addContribution(req, res) {
	if (!req.body) {
		return res.sendStatus(200);
	}
	new Contribution(req.body).save((error, contribution) => {
		if(error) {
			sendError(res, error.message);
		}
		else {
			res.status(201);
			res.send(contribution);
		}
	})	
}

function removeContribution(req, res) {
	const id = req.params.id
	if (!id) {
		return res.sendStatus(200);
	}
	Contribution.findByIdAndRemove(id).exec((error) => {
		if(error) {
			sendError(res, error.message);
		}
		else {
			res.status(204)
			res.send(`Successfully deleted contribution: ${id}`)
		}
	})
}

function validateRecord(req, res, next) {
	if (!req.body) {
		return res.sendStatus(200);
	}
	let today = new Date();
	today.setHours(0,0,0,0);
	req.body.date = today;
	Job.find().exec((error,jobs) => {
		console.log("got jobs", jobs)
		if(error) {
			sendError(res, error.message);
		}
		else {
			const jobNames = jobs.map((job) => job.name)
			const jobName = req.body.job.name;
			const jobDate = req.body.date;
			// check for a valid job
			const validJob = jobName && jobNames.includes(jobName);
			// check for a valid date
			const hasDate = jobDate && jobDate instanceof Date;
			if(validJob && hasDate) {
				next();			
			}
			else {
				sendError(res, `Not a valid job: ${jobName}`)
			}
		}
	})
}

module.exports = {
	getContributions,
	addContribution,
	removeContribution,
	validateRecord
}