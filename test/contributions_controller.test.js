const expect = require('expect')
const {validateRecord} = require('../controllers/contributions_controller')

describe("validateRecord", () => {
	it("should validate if valid job and Date object", () => {
		const record = {
			job: {
				name: "Dishes"
			},
			date: new Date()
		}
		expect(validateRecord(record)).toBe(true)
	})
})