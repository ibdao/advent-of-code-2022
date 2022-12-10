const { getInput } = require("../input.js");

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
			if (checkCycle(cycle['c'])){
				console.log(cycle);
			}
			cycle['c']++;
			cycle['v'] += parseInt(value);
		}

		if (checkCycle(cycle['c'])){
			sum += (cycle['v'] * cycle['c']);
		}

		if (checkCycle(cycle['c'])){
			console.log(cycle);
		}
  }

	return sum;
}

function checkCycle(cycle){
	if (cycle === 20 || cycle === 60 || cycle === 100 || cycle ===140 || cycle === 180 || cycle === 220){
		return true;
	} 	
	return false;
}

console.log(cathode_rayTube());
