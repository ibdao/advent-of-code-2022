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

function ropeBridge(){
    let input = syncReadFile('./Day-09-input.txt');
    let visited = new Set();

    let head = {x : 0, y : 0, oldX : 0, oldY : 0};
    let tail = {x : 0, y : 0};

    for (let line of input){
        console.log(line);
        let [direction, steps]= line.split(' ');

        for (let i = 0; i < parseInt(steps); i++){
            head.oldX = head.x;
            head.oldY = head.y;

            if (direction === 'U') head.y++;
            else if (direction === 'D') head.y--;
            else if (direction === 'R') head.x++;
            else if (direction === 'L') head.x--;

            if (!isTouching(head, tail)){
                tail.x = head.oldX;
                tail.y = head.oldY;
            }
            
            visited.add(`${tail.x},${tail.y}`);
        }
    }

    return visited.size;
}

function isTouching(head, tail){
    let dx = (Math.abs(head.x - tail.x));
    let dy = (Math.abs(head.y - tail.y));

    return dx <= 1 && dy <= 1;
}


console.log(ropeBridge());