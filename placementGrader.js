
var grade = function(grade, classXP, compXP, arg, ref, ce, ps) {

	var total = classXP + compXP + arg + ref + ce + ps;
	var totalBeforePS = classXP + compXP + arg + ref + ce;
	var totalXP = classXP + compXP;
	var totalAfterXP = arg + ref + ce + ps;
	var argRefCe = arg + ref + ce;

	if (grade === 5) {

		return 1;
	}
	if (grade === 6) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 2;
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 3;
		}
		else {
			return 2;
		}
	}

	if (grade === 7) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 2;
		}
		if (total >= 12) {
			return 4;
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 3;
		}
		else {
			return 2;
		}
	}

	if (grade === 8) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 5;
		}
		if (total >= 12) {
			return 10;
		}
		if (totalXP < 2 && argRefCe >= 3 && ps >= 2) {
			return 6;
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 3;
		}
		else {
			return 5;
		}
	}

	if (grade >= 9) {
		
		if (arg === 0 || ref === 0 || ce === 0) {
			return 5;
		}
		if (total >= 12) {
			return 11;
		}
		if (totalXP < 4 && argRefCe >= 3) {
			return 6;
		}
		else {
			return 5;
		}
	}
}

module.exports = grade; 

//test cases
console.log('Test Cases' + '\n');
console.log('5th Grade Test: ' + '\n');
console.log(grade(5,2,2,2,2,2,2));
console.log('Should return 1');

console.log('6th Grade Test: ' + '\n');

console.log('Case Returned: ');
console.log(grade(6,2,2,2,2,2,2));
console.log('Should return 3');
console.log('Case Returned: ');
console.log(grade(6,1,1,1,1,1,2));
console.log('Should return 3');
console.log('Case Returned: ');
console.log(grade(6,1,0,1,1,1,2));
console.log('Should return 2');
console.log('Case Returned: ');
console.log(grade(6,1,1,1,1,1,1));
console.log('Should return 2');
console.log('Case Returned: ');
console.log(grade(6,1,0,1,1,1,2));
console.log('Should return 2');
console.log('Case Returned: ');
console.log(grade(6,1,1,1,1,1,1));
console.log('Should return 2');

console.log('7th Grade Test: ' + '\n');

console.log('Case Returned: ');
console.log(grade(7,2,2,2,2,2,2));
console.log('Should return 4');
console.log('Case Returned: ');
console.log(grade(7,2,2,2,2,2,1));
console.log('Should return 2');
console.log('Case Returned: ');
console.log(grade(7,2,2,2,1,2,2));
console.log('Should return 3');
console.log('Case Returned: ');
console.log(grade(7,1,2,2,1,2,2));
console.log('Should return 3');
console.log('Case Returned: ');
console.log(grade(7,1,2,2,1,2,2));
console.log('Should return 3');
console.log('Case Returned: ');
console.log(grade(7,1,1,1,1,1,2));
console.log('Should return 3');
console.log('Case Returned: ');
console.log(grade(7,1,0,1,1,1,2)); //!
console.log('Should return 2');
console.log('Case Returned: ');
console.log(grade(7,0,0,0,0,0,1));
console.log('Should return 2');
console.log('Case Returned: ');
console.log(grade(7,1,1,2,0,0,2)); //!
console.log('Should return 2');

console.log('8th Grade Test: ' + '\n');

console.log('Case Returned: ');
console.log(grade(8,2,2,2,2,2,2));
console.log('Should return 10');
console.log('Case Returned: ');
console.log(grade(8,2,1,2,2,2,2));
console.log('Should return 3');
console.log('Case Returned: ');
console.log(grade(8,2,0,2,2,2,2));
console.log('Should return 3');
console.log('Case Returned: ');
console.log(grade(8,1,0,2,2,2,2));
console.log('Should return 6');
console.log('Case Returned: ');
console.log(grade(8,1,0,2,2,2,1));
console.log('Should return 5');
console.log('Case Returned: ');
console.log(grade(8,2,2,2,1,2,1));
console.log('Should return 5');
console.log('Case Returned: ');
console.log(grade(8,2,2,0,2,2,2));
console.log('Should return 5');

// 1 PSDS
// 2 Intro to Debate
// 3 Argumentation Fundamentals
// 4 Policy
// 5 Intro 8 Plus
// 6 Original Oratory
// 7 TED Talk
// 8 Extemporanous Speaking
// 9 Advanced Debate
// 10 Middle School Elite
// 11 Elite or Advanced Debate