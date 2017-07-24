
//This function takes input scores from a Podio Placement Test Item and generates
//a placement recommendation based on the latest rubric. It returns an integer,
//which corresponds to a field ID value in the Podio item. The number for each class
//is determined by Podio.

// PSDS -1
// Introduction to Debate - 3
// Argumentation Fundamentals - 4
// Policy - 5
// Intro 8 Plus - 7
// Original Oratory - 12
// TED Talk - 8
// Extemporanous Speaking - 13
// Advanced Debate - 6
// Middle School Elite - 11
// Elite - 9
// function getMap(printMap) {
// 	var map = require('./mapper.js')
// 	printMap()
// }

// function printMap(map) {
// 	console.log(map)
// }

// getMap(printMap)

function grade(grade, classXP, compXP, arg, ref, ce, ps) {
	var total = classXP + compXP + arg + ref + ce + ps
	var totalBeforePS = classXP + compXP + arg + ref + ce
	var totalXP = classXP + compXP
	var totalAfterXP = arg + ref + ce + ps
	var argRefCe = arg + ref + ce
	var placement
	var courseRec


	//use map variable to make readable return values
	if (grade === 5) {

		return 1
	}
	if (grade === 6) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 3
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 4;
		}
		else {
			return 3
		}
	}

	if (grade === 7) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 3
		}
		if (total >= 12) {
			return 5
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 4;
		}
		else {
			return 3
		}
	}

	if (grade === 8) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 4
		}
		if (total >= 12) {
			return 6
		}
		if (totalXP < 2 && argRefCe >= 3 && ps >= 2) {
			return 6
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 4
		}
		else {
			return 4
		}
	}

	if (grade >= 9) {
		
		if (arg === 0 || ref === 0 || ce === 0) {
			return 4
		}
		if (total >= 12) {
			return 6
		}
		if (totalXP < 4 && argRefCe >= 3) {
			return 6
		}
		else {
			return 4
		}
	}
}
module.exports = grade
