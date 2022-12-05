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