const { readFileSync, promises: fsPromises } = require("fs");

/** Function to read a file and parse contents into a javascript array.
 *  Splits file items line by line into elements of an array.
 *
 *  an empty line will show up as '' element in the array.
 */
function getInput(filename) {
  const contents = readFileSync(filename, "utf-8");

  const arr = contents.split(/\r?\n/);

  return arr;
}

module.exports ={
    getInput
}