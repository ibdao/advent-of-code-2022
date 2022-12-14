const { getInput } = require("../input.js");

/**
 * Explanation and Approach... this one was hard... 
 *
 * The way the filesystem outputs commands, the files will have their sizes listed first.
 * I want to break up the input to only have the output of the commands and then
 * have a running total that will keep the total sum of files greater than 100,000.
 *
 * */

function getTotalSize() {
  let input = getInput("./Day-07-input.txt");

  let currentDirectory = "";

  let directories = {
    "/": {
      parent: "",
      files: [],
      directories: [],
    },
  };

  for (let line of input) {
    let token = line.split(" ");
    if (token[0] === "$") {
      if (token[1] === "cd") {
        if (token[2] === "/") {
          currentDirectory = "/";
        } else if (token[2] === "..") {
          let path = currentDirectory.split("/");
          currentDirectory = path.splice(0, path.length - 1).join("/");
        } else {
          currentDirectory =
            (currentDirectory === "/"
              ? currentDirectory
              : currentDirectory + "/") + token[2];
        }
      }
    } else if (token[0] === "dir") {
      let newDirectory =
        (currentDirectory === "/" ? currentDirectory : currentDirectory + "/") +
        token[1];

      directories[newDirectory] = { parent: "", files: [], directories: [] };
      directories[currentDirectory].directories.push(newDirectory);
    } else {
      directories[currentDirectory].files.push({
        file: token[1],
        size: parseInt(token[0]),
      });
    }
  }

  let calculateSize = (directory) => {
    return (
      directories[directory].files.reduce((acc, file) => acc + file.size, 0) +
      directories[directory].directories.reduce(
        (acc, child) => acc + calculateSize(child),
        0
      )
    );
  };

  // return Object.keys(directories).reduce((acc, key) => {
  //   let total = calculateSize(key);
  //   if (total <= 100000) acc += total;
  //   return acc;
  // }, 0);

	let unused = 30000000 - (70000000 - calculateSize('/'));
    let allSizes = Object.keys(directories).map(directory => {
        return calculateSize(directory);
    });

    return allSizes.reduce((lowest, size) => {
        if (size >= unused) return Math.min(lowest, size);
        return lowest;
    }, Infinity);
}

console.log(getTotalSize());
