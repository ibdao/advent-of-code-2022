const { getInput } = require('../input.js');


/** Goal is to end with a object like:
 * 
 * valves: {
 *  'valve': {rate: n, valves: [] }
 * }
 */

function createMap(){
    let valves ={};
    let input = getInput('./Day-16-input.txt');
    for (let line of input){
        valves[line.slice(6,8)] = {
            'rate': parseInt(line.split('=')[1].split(';')[0]), 
            'valve': line.split('to')[1].split(' ').filter(item => item !== '' && item !== 'valve' && item !== 'valves').map(n => n.slice(0,2))}
    }
    return valves  
}

function openValves(){
    let valves = createMap();
    let time = 1;
    let flow = 0;
    let visited = new Set();
    let stack = [ Object.keys(valves).reverse().pop() ];

    while (time < 30){
        let curr = stack.pop();

        console.log(curr, valves[curr]);

        let nextValve = valves[curr].valve.shift();
        stack.push(nextValve);

        visited.add(curr);

        time += 2;
    }

    return flow;

}

console.log(openValves());