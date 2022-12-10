const { getInput } = require("../input.js");


/** Function that creates a javascript object to represent the elf : calories
 *  Takes a txt file to read from to get the amount of calories. 
 *  Returns a JS object that shows { elf# : total calories for that elf }
 * 
 */
function createElfToTotalCalories(filename) {
  let calories = getInput(filename);
  let totals = {};
  let sum = 0;
  let elf = 1;

  for (let i = 0; i < calories.length; i++) {
    let el = calories[i];

    if (el === ''){ 
      totals[elf] = sum;
      elf++;
      sum = 0;
    } else {
      sum += +el; 
    }
  }
  return totals;
}

/** Function that finds the elf with the most amount of calories
 *  Returns most amount of calories carried by an elf 
 */
function findMostAmountOfCalories(){
  let totals = createElfToTotalCalories("./Day-1-input.txt");
  let mostCals = Math.max(...Object.values(totals));

  return mostCals;
}

/** Function that calculates the sum of the top 3 elves that carry the most calories 
 *  Returns the sum. 
*/

function findTop3(){
  let totals = createElfToTotalCalories("./Day-1-input.txt");
  let sortedTotals = Object.values(totals).sort((a,b) => {return a - b}).reverse();
  let sum = 0;

  for (let i = 0; i <= 2; i++){
    sum += sortedTotals[i];
  }

  return sum;
}
console.log(findMostAmountOfCalories());
console.log(findTop3()); 
