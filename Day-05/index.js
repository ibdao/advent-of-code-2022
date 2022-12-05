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

/** Starting Stack of Crates */

const STACKS = [
    ['Z', 'J', 'G'], 
    ['Q', 'L', 'R', 'P', 'W', 'F', 'V', 'C'], 
    ['F', 'P', 'M', 'C', 'L', 'G', 'R'],
    ['L', 'F', 'B', 'W', 'P', 'H', 'M'], 
    ['G', 'C', 'F', 'S', 'V', 'Q'], 
    ['W', 'H', 'J', 'Z', 'M', 'Q', 'T', 'L'],
    ['H', 'F', 'S', 'B', 'V'],
    ['F', 'J', 'Z', 'S'],
    ['M', 'C', 'D', 'P', 'F', 'H', 'B', 'T'],
]

/** Helper function that moves crates and updates stacks 
 *  Takes a direction [quantity, move from stack, move to stack]
 *  updates stacks
*/
function moveCratesAndUpdateStacks(direction){
    let quantity = +direction[0];
    let from = STACKS[+direction[1] - 1];
    let to = STACKS[+direction[2] - 1]; 

    for(let i = 0; i < quantity; i++){
        let crate = from.pop();
        to.push(crate);
    }

    STACKS[direction[1] - 1] = from;
    STACKS[direction[2] - 1] = to;
}

/** Helper function that takes stacks
 *  and returns an array of the top crates in each stack
 */
function getTopCrates(stacks){
    let topCrates = [];

    for (let stack of stacks){
        topCrates.push(stack.pop());
    }

    return topCrates;

}

/** Helper function that gets the directions from the input
 *  and returns new directions formatted as: 
 * [quantity to be moved, stack to move from, stack to move to]
 */
function getDirections(){
    let input = syncReadFile('./Day-05-input.txt'); 
    let numbersOnly = [];
    for (let direction of input){
        let numbers = direction.split(' ').filter(n => isNaN(+n) === false);
        numbersOnly.push(numbers);
    }

    return numbersOnly;
}

/** Main function that moves crates and returns the top crates of each stack */
function supplyStacks(){
    let directions = getDirections(); 

    for (let direction of directions){
        moveCratesAndUpdateStacks(direction); 
    }

    let topCrates = getTopCrates(STACKS);

    return topCrates.join('');
    
}

console.log(supplyStacks());