const { getInput } = require("../input.js");

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

    let crates = []; 

    for(let i = 0; i < quantity; i++){
        let crate = from.pop();
        /** Part 1: 
         *  Remove: lines 39, 47 & 51
         *  Add: to.push(crate);
         */
        crates.push(crate); 

    }

    to.push(...crates.reverse());

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
    let input = getInput('./Day-05-input.txt'); 
    let numbersOnly = [];
    for (let direction of input){
        let numbers = direction.split(' ').filter(n => isNaN(+n) === false);
        numbersOnly.push(numbers);
    }

    return numbersOnly;
}

/** Main function that moves crates and returns the top crates of each stack 
 * Explanation and Approach: 
 * I want to parse out the information from the original input 
 * so that I just have the numbers in the format: [quantity to be moved, move from stack, move to stack]
 * 
 * Next I want to select the stack using the index of STACKS
 * pop() the last item from that stack and push() onto the move to stack. 
 * 
 * Lastly I want to get the last item in every stack (this would be the top crate in every stack)
 * 
 * Part 2 involves similar thinking but this time we can move multiple crates at once. 
 * To implement this, I added an array that will be moved from the stacks. 
 * 
*/
function supplyStacks(){
    let directions = getDirections(); 

    for (let direction of directions){
        moveCratesAndUpdateStacks(direction); 
    }

    let topCrates = getTopCrates(STACKS);

    return topCrates.join('');
    
}

console.log(supplyStacks());