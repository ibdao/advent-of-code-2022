const { getInput } = require("../input.js");

/** Approach and Explanation:
 * Part I:
 * I wanted to store the cycle and X value in an object. 
 * For noop instructions we increase the cycle by 1. 
 * For addx instructions we increase the cycle by 1 then check if the cycle is 
 * 20, 60, 100, 140, 180, 220 if it is we add the strength (x value * cycle #) to our sum 
 * 
 * After checking, I want to increase the cycle again and add the x value to the 
 * existing tracker. 
 * 
 * Part II:
 */

function cathode_rayTube() {
  let input = getInput("./Day-10-input.txt");
  let cycle = {'c' : 1, 'v' : 1}
	let sum = 0; 

  for (let line of input) {
    let [instruction, value] = line.split(" ");

		if (instruction === 'noop'){
			cycle['c']++; 
		} else if (instruction === 'addx'){
			cycle['c']++;
			if (checkCycle(cycle['c'])) sum += (cycle['v'] * cycle['c']);
			cycle['c']++;
			cycle['v'] += parseInt(value);
		}

		if (checkCycle(cycle['c'])){
			sum += (cycle['v'] * cycle['c']);
		}
  }

	return sum;
}

/** Part 2 */

function draw(){
	let input = getInput("./Day-10-input.txt");
  let cycles = {}
	let cycle = 1;
	let v = 1;
	let CRT = '';

	for (let line of input){
		let [instruction, value] = line.split(' ');
		
		if (instruction === 'noop'){
			cycles[cycle] = v;
			cycle++;
		} else if (instruction === 'addx'){
			cycles[cycle] = v;
			cycle++;
			cycles[cycle] = v;
			v += parseInt(value);
			cycle++;
		}
	}

	for (let i = 0; i < cycle; i++){
		if (visible(i, cycles)){
			CRT += '#';
		} else {
			CRT += '.';
		}

		if (i % 40 === 0){
			CRT += '\n';
		}
	}

	return CRT;
}

/** Helper functions */

function checkCycle(cycle){
	if (cycle === 20 || cycle === 60 || cycle === 100 || cycle === 140 || cycle === 180 || cycle === 220){
		return true;
	} 	
	return false;
}

function visible(i, cycles){
	let diff = (i % 40 ? i % 40 : 40) - cycles[i.toString()];

	return diff >= 0 && diff <= 2;
}


console.log(cathode_rayTube());
console.log(draw());
