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
            'valve': line.split('to')[1].split(' ').filter(item => item !== '' && item !== 'valve' && item !== 'valves').map(n => n.slice(0,2)),
            'status': 'closed'
        }
    }
    return valves  
}

function openValves(){
    let valves = createMap();
    // we have a map of the valves with their rates, connecting valves and status
    let stack = [ valves[Object.keys(valves)[0]] ]
    let i = 0
    while (i < 30){
        let curr = stack.pop();

        if (curr.rate > 0){
            curr.status = 'opened'
        }
        
    
    }

    return curr;

}

console.log(openValves());