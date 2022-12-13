const { getInput } = require("../input.js");

function refinedInput() {
  let input = getInput("./Day-13-input.txt");
  let newInput = [];

  for (let line of input) {
    let newLine = JSON.parse("[" + line + "]");
    newInput.push(newLine);
  }

  return newInput.flat();
}

function distressSignal() {
  let input = refinedInput();
  let leftPairs = [];
  let rightPairs = [];

  for (let i = 0; i < input.length; i++) {
    if (i % 2 === 0) {
      leftPairs.push(input[i]);
    } else {
      rightPairs.push(input[i]);
    }
  }

	let sum = 0; 

	for (let i = 0; i < leftPairs.length; i++){
		if (checkPairs(leftPairs[i], rightPairs[i])){
			console.log(leftPairs[i], '*' ,rightPairs[i]);
			sum += i + 1;
			console.log(i + 1);
		}
	}
  return sum;
}

function checkPairs(left, right) {
	for (let i = 0; i < left.length; i++){

		let l = left[i];
		let r = right[i];

		if (r === undefined) return false;
		
		if (typeof l === 'number' && typeof r === 'number'){

			if (l < r) {
				return true;
			} else if (l > r){ 
				return false;
			} else {
				continue;
			}


		} else if (typeof l === 'object' && typeof r === 'object'){
			let nested = checkPairs(l, r);
			if (nested === null){
				continue;
			} else {
				return nested;
			}
		} else {
			if (typeof l === 'number'){
				let nested = checkPairs([l], r);
				if (nested === null){
					continue;
				} else {
					return nested;
				}

			} else {
				let nested = checkPairs(l, [r]);

				if (nested === null){
					continue;
				} else {
					return nested;
				}
			}
		}
	}

	if (right.length > 0){
		return true;
	} else {
		return null;
	}
}

console.log(distressSignal());
