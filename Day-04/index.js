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

/**
 * Explanation and Approach: 
 * My goal here was to parse the original input so that I just pairs of the sections 
 * Next I wanted to see if one pair completely includes the other by seeing if the first pair contains the second pair
 * And then see if the second pair contains the first pair. 
 * 
 * For Part 2, we just want to see if they overlap such that either section touches the boundaries of the other. 
 * 
 */

function findOverlapping(){
    let input = syncReadFile('./Day-04-input.txt');
    let count = 0;
    
    for (let assignment of input){
        let newPairs = [];

        let parsedPairs = parsePairs(assignment);

        for (let pair of parsedPairs){
            newPairs.push(changeStringPairToList(pair));
        }
        
        if (parseInt(newPairs[0][0]) <= parseInt(newPairs[1][0]) 
            && parseInt(newPairs[0][1]) >= parseInt(newPairs[1][0])){
            count++;
        } else if (parseInt(newPairs[1][0]) <= parseInt(newPairs[0][0]) 
            && parseInt(newPairs[1][1]) >= parseInt(newPairs[0][0])){
            count++;
        }
    }

    return count;
}

/** Helper function that splits each assignment betwwen the two elves. */

function parsePairs(pair){
    let pairs = pair.split(',');
    return pairs
}

/** Helper function that gets the start and end of each section. */
function changeStringPairToList(pair){
    let arr = pair.split('-');
    return arr;
}
console.log(findOverlapping())