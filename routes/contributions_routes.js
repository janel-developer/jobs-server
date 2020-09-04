const express = require('express')
const {getContributions, addContribution, removeContribution} = require('../controllers/contributions_controller')

const router = express.Router()

router.get("/", getContributions)
router.post("/", addContribution)
router.delete("/:id", removeContribution)

module.exports = router