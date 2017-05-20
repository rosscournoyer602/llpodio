
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

var grade = function(grade, classXP, compXP, arg, ref, ce, ps) {


	var total = classXP + compXP + arg + ref + ce + ps;
	var totalBeforePS = classXP + compXP + arg + ref + ce;
	var totalXP = classXP + compXP;
	var totalAfterXP = arg + ref + ce + ps;
	var argRefCe = arg + ref + ce;
	var placement;
	var courseRec;

		// console.log('\n');
		// console.log('Grade = ' + grade);
		// console.log('Total = ' + total);
		// console.log('TotalXP = ' + totalXP);
		// console.log('argRefCe = ' + argRefCe);

	if (grade === 5) {

		return 1;
	}
	if (grade === 6) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 3;
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 4;
		}
		else {
			return 3;
		}
	}

	if (grade === 7) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 3;
		}
		if (total >= 12) {
			return 5;
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 4;
		}
		else {
			return 3;
		}
	}

	if (grade === 8) {

		if (arg === 0 || ref === 0 || ce === 0) {
			return 7;
		}
		if (total >= 12) {
			return 6;
		}
		if (totalXP < 2 && argRefCe >= 3 && ps >= 2) {
			return 12;
		}
		if (totalXP >=2 && argRefCe >= 3 && ps >= 2) {
			return 4;
		}
		else {
			return 7;
		}
	}

	if (grade >= 9) {
		
		if (arg === 0 || ref === 0 || ce === 0) {
			return 7;
		}
		if (total >= 12) {
			return 6;
		}
		if (totalXP < 4 && argRefCe >= 3) {
			return 12;
		}
		else {
			return 7;
		}
	}
}
	module.exports = grade;
	//console.log('return ' + placement);
	
// 	switch(placement) {
// 		case 1:
// 			courseRec = 1;
// 			break;
// 		case 2:
// 			courseRec = 3;
// 			break;
// 		case 3:
// 			courseRec = 'Argumentation Fundamentals';
// 			break;
// 		case 4:
// 			courseRec = 5;
// 			break;
// 		case 5:
// 			courseRec = 7;
// 			break;
// 		case 6:
// 			courseRec = 12;
// 			break;
// 		case 7:
// 			courseRec = 'TED Talk';
// 			break;
// 		case 8:
// 			courseRec = 'Extemporaneous Speaking';
// 			break;
// 		case 9:
// 			courseRec = 6;
// 			break;
// 	}
// 	return courseRec;
// } 

//test cases
// console.log('Test Cases' + '\n');
// console.log('5th Grade Test: ' + '\n');
 console.log(grade(5,2,2,2,2,2,2));
// console.log('Should return 1');

// console.log('6th Grade Test: ' + '\n');

// console.log('Case placement =ed: ');
// console.log(grade(6,2,2,2,2,2,2));
// console.log('Should return 3');
// console.log('Case placement =ed: ');
// console.log(grade(6,1,1,1,1,1,2));
// console.log('Should return 3');
// console.log('Case placement =ed: ');
// console.log(grade(6,1,0,1,1,1,2));
// console.log('Should return 2');
// console.log('Case placement =ed: ');
// console.log(grade(6,1,1,1,1,1,1));
// console.log('Should return 2');
// console.log('Case placement =ed: ');
// console.log(grade(6,1,0,1,1,1,2));
// console.log('Should return 2');
// console.log('Case placement =ed: ');
// console.log(grade(6,1,1,1,1,1,1));
// console.log('Should return 2');

// console.log('7th Grade Test: ' + '\n');

// console.log('Case placement =ed: ');
// console.log(grade(7,2,2,2,2,2,2));
// console.log('Should return 4');
// console.log('Case placement =ed: ');
// console.log(grade(7,2,2,2,2,2,1));
// console.log('Should return 2');
// console.log('Case placement =ed: ');
// console.log(grade(7,2,2,2,1,2,2));
// console.log('Should return 3');
// console.log('Case placement =ed: ');
// console.log(grade(7,1,2,2,1,2,2));
// console.log('Should return 3');
// console.log('Case placement =ed: ');
// console.log(grade(7,1,2,2,1,2,2));
// console.log('Should return 3');
// console.log('Case placement =ed: ');
// console.log(grade(7,1,1,1,1,1,2));
// console.log('Should return 3');
// console.log('Case placement =ed: ');
// console.log(grade(7,1,0,1,1,1,2)); //!
// console.log('Should return 2');
// console.log('Case placement =ed: ');
// console.log(grade(7,0,0,0,0,0,1));
// console.log('Should return 2');
// console.log('Case placement =ed: ');
// console.log(grade(7,1,1,2,0,0,2)); //!
// console.log('Should return 2');

// console.log('8th Grade Test: ' + '\n');

// console.log('Case placement =ed: ');
// console.log(grade(8,2,2,2,2,2,2));
// console.log('Should return 10');
// console.log('Case placement =ed: ');
// console.log(grade(8,2,1,2,2,2,2));
// console.log('Should return 3');
// console.log('Case placement =ed: ');
// console.log(grade(8,2,0,2,2,2,2));
// console.log('Should return 3');
// console.log('Case placement =ed: ');
// console.log(grade(8,1,0,2,2,2,2));
// console.log('Should return 6');
// console.log('Case placement =ed: ');
// console.log(grade(8,1,0,2,2,2,1));
// console.log('Should return 5');
// console.log('Case placement =ed: ');
// console.log(grade(8,2,2,2,1,2,1));
// console.log('Should return 5');
// console.log('Case placement =ed: ');
// console.log(grade(8,2,2,0,2,2,2));
// console.log('Should return 5');