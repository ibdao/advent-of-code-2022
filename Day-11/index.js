const { getInput } = require("../input.js");



/**
 * Part I: monkey in the middle
 * @returns the product of the monkeys with the highest inspections
 * 
 */
function monkeyInTheMiddle() {
  let input = getInput("./Day-11-input.txt");
	let monkeys = refinedInput(input);
	let rounds = 0;
	let counts = [];
	
	/** 1 round is going through all the monkeys once */
	while(rounds < 10000){
		for (let monkey in monkeys){
			let items = monkeys[monkey]['startingItems'];

			while (items.length){
				let item = items.shift();
				inspectItem(item, monkeys, monkey);
			}
		}
		rounds++;
	}
	
	for (let monkey in monkeys){
		let count = monkeys[monkey]['count'];
		counts.push(count);
	}
	counts.sort((a,b) => a - b).reverse();
	return counts[0] * counts[1];

}

/** Worry level = starting worry level then operation divided by 3
 *  Test worry level to decided which monkey to throw to. 
 * 	increase current monkey inspected items count 
 *  Push worry level to toMonkey
*/
function inspectItem(item, monkeys, monkeyNum){
	monkeys[monkeyNum]['count']++;
	
	let expression = monkeys[monkeyNum]['Operation'].split(' ');
	let operation = expression[expression.length - 2];
	let test = monkeys[monkeyNum]['Test'].split(' ');
	
	// Original worry level
	let worryLevel = BigInt(item);

	let number = (expression[expression.length - 1] === 'old') 
	? BigInt(worryLevel)
	: BigInt(expression[expression.length - 1]);
	
	// Worry level is increased
	let monkeyInspects = doMath(operation, worryLevel, number);
	
	// Worry level is decreased
	//let monkeyBored = BigInt(monkeyInspects /= 3);

	let divideBy = BigInt(test[test.length - 1]);
	
	//let passed = (monkeyBored % divideBy === 0) ? true : false;
	let passed = (monkeyInspects % divideBy === 0) ? true : false;
	let toMonkey = monkeys[monkeyNum][passed];
	
	monkeys[toMonkey]['startingItems'].push(BigInt(monkeyInspects));
}

/** Helper function */
function doMath(operation, x, y){
	if (operation === '*') return x * y;
	if (operation === '+') return x + y;
}

/** Input so that Monkeys are contained within an object with their info */
function refinedInput(input) {
	let monkeyObj = {};

	for (let line of input) {
		let newLine = line.trim();

		if (newLine.startsWith("Monkey")) {
			monkeyNum = newLine.slice(newLine.length - 2, newLine.length - 1);
			monkeyObj[monkeyNum] = {};
		} else if (monkeyNum && newLine !== ''){
			let [key, value] = newLine.split(':');

			if (key.includes('Starting')){
				monkeyObj[monkeyNum]['startingItems'] = value.trim().split(',').map(n => parseInt(n));
			} else if (key.includes('If')){
				let bool = key.split(' ')[1];
				let toMonkey = value[value.length - 1];
				monkeyObj[monkeyNum][bool] = toMonkey;
			} else {
				monkeyObj[monkeyNum][key] = value.trim();
			}

			monkeyObj[monkeyNum]['count'] = 0;
		}
	}

	return monkeyObj;
}


console.log(monkeyInTheMiddle());
