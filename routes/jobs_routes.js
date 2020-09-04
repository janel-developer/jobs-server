const express = require('express')
const {getJobs} = require('../controllers/jobs_controller')

const router = express.Router()

router.get("/", getJobs)

module.exports = router