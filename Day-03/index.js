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

function rucksackPriorites() {
	let sum = 0;
  let ruckSacksArr = syncReadFile("./Day-03-input.txt");

  for (let ruckSack of ruckSacksArr) {
    let compartment1 = ruckSack.slice(0, ruckSack.length / 2);
    let compartment2 = ruckSack.slice(ruckSack.length / 2);

		let commonChar = findCommonChar(compartment1, compartment2);
		sum += getPriority(commonChar);
  }

	return sum; 
}

/** Helper function to find common char between 2 strings*/
function findCommonChar(str1, str2){
	for (let char of str1){
		if (str2.includes(char)){
			return char;
		}
	}
}

/** Helper function to get character priority */
function getPriority(letter){
	let letters = 'abcdefghijklmnopqrstuvwxyz'
	let mapper = letter.toLowerCase(); 

	let prio = letters.indexOf(mapper) + 1; 

	if (letter === mapper.toUpperCase()){
		prio += 26;
	}; 

	return prio;
}

console.log(rucksackPriorites());


/********************************************************************* Part 2 */

function rucksackPrioritesPart2(){
	let sum = 0;
	let ruckSacksArr = syncReadFile("./Day-03-input.txt");
	let groupedRuckSacks = groupIn3s(ruckSacksArr); 

	for (let group of groupedRuckSacks){
		let commonChar = findCommonCharOf3(group[0], group[1], group[2]); 
		sum += getPriority(commonChar);
	}

	return sum;

}

/** Helper function that groups every 3 items in an array together.  */
function groupIn3s(arr){
	let res = [];
	let group = [];
	for (let i = 0; i < arr.length; i++){
		group.push(arr[i]); 

		if (group.length === 3){
			res.push(group); 
			group = [];
		}
	}

	return res;
}

/** Helper funciton that finds the common char of three strings */
function findCommonCharOf3(str1, str2, str3){
	for (let char of str1){
		if (str2.includes(char) && str3.includes(char)){
			return char;
		}
	}
}

console.log(rucksackPrioritesPart2());
