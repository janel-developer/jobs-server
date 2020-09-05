const express = require('express')
const {getContributions, validateRecord, addContribution, removeContribution} = require('../controllers/contributions_controller')

const router = express.Router()

router.get("/", getContributions)
router.post("/", validateRecord, addContribution)
router.delete("/:id", removeContribution)

module.exports = router