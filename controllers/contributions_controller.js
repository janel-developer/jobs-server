const fs = require('fs')
const contributions = require('../data/contributionData.json')
const jobs = require('../data/jobData')
const contributionsFile = './data/contributionData.json'

function getContributions(req, res) {
	res.send(contributions)
}

function addContribution(req, res) {
	if (!req.body)
		return res.sendStatus(200)
	req.body.date = new Date()
	if (validateRecord(req.body)) {
		const id = getNextId(contributions)
		req.body._id = id
		contributions.push(req.body)
		fs.writeFileSync(contributionsFile, JSON.stringify(contributions))
	}
	res.status(201)
	res.send(req.body)

}

function removeContribution(req, res) {
	if (!req.params.id)
		return res.sendStatus(200)
	const updatedContributions = contributions.filter((contribution) => contribution._id !== parseInt(req.params.id) )
	fs.writeFileSync(contributionsFile, JSON.stringify(updatedContributions))	
	res.status(204)
	res.send("Successfully deleted contribution")
}

function getNextId(contributions) {
	const ids = contributions.map((cont) => cont._id)
	const id = ids.length > 0 ? parseInt(ids.sort((a,b) => b-a)[0]) : 0
	return id + 1
}

function validateRecord(record) {
	const job = record.job
	const date = record.date
	// check for a valid job name
	const validJob = job && jobNames().includes(job.name)
	// check for a valid date
	const hasDate = date && date instanceof Date
	return validJob && hasDate
}

function jobNames() {
	return jobs.map((job) => job.name)
}
module.exports = {
	getContributions,
	addContribution,
	removeContribution,
	validateRecord,
	getNextId
}