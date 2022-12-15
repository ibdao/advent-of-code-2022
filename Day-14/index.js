const { getInput } = require("../input.js");

/** Approach and Explanation
 *
 *  1. first I want to build a grid with rocks and air.
 *     the input tells me where the rocks are in x and y coords.
 *     So I can build a grid by looping over the input to get the coordinates.
 *
 *
 *
 *
 *
 *
 *
 *
 */

// 0.
function getOriginalInput() {
  let input = getInput("./Day-14-input.txt");
  let refinedInput = input.map((line) =>
    line.split("->").map((l) => l.split(",").map((n) => parseInt(n)))
  );
  return refinedInput;
}
// 1.
function findBoundaries(input) {
  let maxX = 0,
    maxY = 0;
  let minX = Infinity,
    minY = Infinity;

  for (let line of input) {
    for (let rock of line) {
      let [x, y] = rock;
      if (x < minX) minX = x;
      if (y < minY) minY = y;
      if (x > maxX) maxX = x;
      if (y > maxY) maxY = y;
    }
  }
  return [maxX, maxY, minX, minY];
}

function buildGrid() {
  let input = getOriginalInput();
  let [maxX, maxY, minX, minY] = findBoundaries(input);
  let dx = Math.abs(maxX - minX);
  let grid = [];

  for (let i = 0; i <= dx; i++) {
    let row = [];
    for (let j = 0; j <= maxY; j++) {
      row.push(".");
    }
    grid.push(row);
  }

  for (let line of input) {
    let rock = line.shift();

    while (line.length > 0) {
      let nextRock = line.shift();
      let [x, y] = rock;
      let [m, n] = nextRock;

      if (x === m) {
        for (let i = Math.min(y, n); i < Math.max(y, n); i++) {
          grid[i][maxX - x] = "#";
        }
      } else if (y === n) {
        for (let i = Math.min(x, m); i < Math.max(x, m); i++) {
          grid[y][maxX - i] = "#";
        }
      }

      rock = nextRock;
    }
  }
  grid.map((line) => line.reverse());

  return grid;
}

console.log(buildGrid());

[
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", "#", ".", ".", ".", "#", "."],
  [".", ".", ".", ".", "#", ".", ".", ".", "#", "."],
  [".", ".", "#", "#", ".", ".", ".", ".", "#", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
  [".", ".", ".", ".", ".", ".", ".", ".", "#", "."],
  ["#", "#", "#", "#", "#", "#", "#", "#", ".", "."],
];
