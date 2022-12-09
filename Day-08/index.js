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
 * Explanation And Approach: 
 * The perimeter of the grid contain visible trees. 
 * A tree is visible if its height is the highest in one of four directions
 * 
 * 1 2 3
 * 0 5 1
 * 2 3 4 
 * 
 * 5 is visible in all directions
 * 
 * I want to have an explore function that will take a coord
 * and explore in all directions to see if the values of neighboring coord is 
 * greater than the tree I am currently on. 
 * 
 * If one of the 4 directions returns true and the current tree is the highest 
 * amongst the 4 directions that I can mark it as visible. 
 */

function findVisibleTrees(){
    let input = syncReadFile('./Day-08-input.txt');
    let grid = input.map(line => line.split('').map(n => parseInt(n)));
    let visible = 0;
    let highestScore = 0;

    /**
     * Part 2: find scenic score
     */

    for (let i = 0; i < grid.length; i++){
        for (let j = 0; j < grid[0].length; j++){
            let height = grid[i][j]; 

            let north = exploreNorth([i - 1, j], grid, height);
            let south = exploreSouth([i + 1, j], grid, height);
            let east = exploreEast([i, j + 1], grid, height);
            let west = exploreWest([i, j - 1], grid, height);

            let score = north * south * east * west;
            //console.log('height=',height, north, south, east, west, 'score=', score);

            highestScore = Math.max(highestScore, score);
        }
    }

    return highestScore;
}

function exploreNorth(pos, grid, height, count=0){
    let [x, y] = pos;

    if (x < 0 || x >= grid.length) return count;
    if (y < 0 || y >= grid.length) return count;

    if (grid[x][y] >= height) return count + 1; 

    return exploreNorth([x - 1, y], grid, height, count + 1);
    
}

function exploreSouth(pos, grid, height, count=0){
    let [x, y] = pos;
    if (x < 0 || x >= grid.length) return count;
    if (y < 0 || y >= grid.length) return count;

    if (grid[x][y] >= height) return count + 1; 

    return exploreSouth([x + 1, y], grid, height, count + 1);
    
}

function exploreEast(pos, grid, height, count=0){
    let [x, y] = pos;
    if (x < 0 || x >= grid.length) return count;
    if (y < 0 || y >= grid.length) return count;

    if (grid[x][y] >= height) return count + 1; 

    return exploreEast([x, y + 1], grid, height, count + 1);
    
}

function exploreWest(pos, grid, height, count=0){
    let [x, y] = pos;
    if (x < 0 || x >= grid.length) return count;
    if (y < 0 || y >= grid.length) return count;

    if (grid[x][y] >= height) return count + 1; 

    return exploreWest([x, y - 1], grid, height, count + 1);
    
}

console.log(findVisibleTrees())