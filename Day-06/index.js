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
 *  Explanation and Approach:
 *  My goal here was to look at the smallest window of characters then check for duplicate characters in that window
 *  
 *  For Part 1 the window was 4 characters long. 
 *  I would find my window, if the window contained duplicates, 
 *  I would add the next character from the input and move my window to the right once and reevaluate for duplicates. 
 *  If there are no duplicates I want to return the position of the character. 
 * 
 *  For Part 2, the approach is the same but now the window is 14 characters long instead of 4. 
 * 
 */

function tuningTrouble(){
    let input = syncReadFile('./Day-06-input.txt'); 
    let letters = input[0].split(''); 

    let start = 3;
    let n = letters.length - start;

    for (let i = start; i < n; i++){
        // getWindow 
        let window = getWindow(letters.slice(0, i + 1));

        // see if window contains any dupes
        let letterFreq = getCounts(window);
        let dupes = Object.values(letterFreq).filter(n => n >= 2); 

        if (dupes.length === 0){
            return i + 1;
        }
    }

}

/** Frequency counter that returns a JavaScript Object  */
function getCounts(items){
    let freq = {};
    for (let item of items){
        const curr = freq[item] || 0; 
        freq[item] = curr + 1;
    }

    return freq;
}

/** Helper function that returns the last four elements of an array,
 *  as an array. 
 */
function getWindow(arr){
    if (arr.length <= 14){
        return arr;
    }
    return arr.slice(arr.length - 14, arr.length);
}

console.log(tuningTrouble());