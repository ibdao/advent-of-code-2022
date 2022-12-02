const { readFileSync, promises: fsPromises } = require("fs");

/** Function to read a file and parse contents into a javascript array.
 *  Splits file items line by line into elements of an array.
 *
 *  an empty line will show up as '' element in the array.
 */
function syncReadFile(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  return arr;
}


/** Calculates total score for x amount of rounds. 
 * 
 *  Returns the total score from rounds of RPS with elf. 
 */
function calculateScore(){

	// Maps my shape to points
	let RPSToScore = {
		'X' : 1,
		'Y' : 2, 
		'Z' : 3,
	};

	// Maps elf's shape to my shape
	let elfToMe = {
		'A' : 'X',
		'B' : 'Y',
		'C' : 'Z', 
	}

	let totalScore = 0;

	// Creates an array of rounds of RPS with elf
	let rounds = syncReadFile('./Day-02-input.txt');

	for (let round of rounds){
		let elf = round[0];
		let me = round[2];
		let win = checkWin(elf, me);

		totalScore += RPSToScore[me];
		
		if (win) totalScore += 6;
		if (elfToMe[elf] === me) totalScore += 3;
	}

	return totalScore;
}

/** Checks if round is won
 *  Takes elf shape and my shape 
 *  returns True if my shape beats elf
 */
function checkWin(elf, me){
	let winning = false;
	if (elf === 'A' && me === 'Y') winning = true;
	if (elf === 'B' && me === 'Z') winning = true;
	if (elf === 'C' && me === 'X') winning = true;

	return winning;
}

/********************************************************************* Part 2 */

function calculateScorePart2(){
	let totalScore = 0; 
	let rounds = syncReadFile('./Day-02-input.txt'); 
	
	// Maps outcome to score
	let end = {
		'X' : 0,
		'Y' : 3,
		'Z' : 6, 
	}

	// Maps shape to score
	let scores = {
		'A' : 1,
		'B' : 2, 
		'C' : 3,
	}

	// Maps what shape is beaten
	let beats = {
		'A' : 'B', 
		'B' : 'C',
		'C' : 'A', 
	}

	// Maps what shape beats
	let loses = {
		'A' : 'C', 
		'B' : 'A',
		'C' : 'B', 
	}

	for (let round of rounds){
		let elf = round[0]; 
		let outcome = end[round[2]];
		totalScore += outcome;

		if (outcome === 0) totalScore += scores[loses[elf]];
		if (outcome === 3) totalScore += scores[elf];
		if (outcome === 6) totalScore += scores[beats[elf]];


	}

	return totalScore; 
}

console.log('part1 ', calculateScore());
console.log('part2 ', calculateScorePart2());





