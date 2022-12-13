const { getInput } = require('../input.js');

function refinedInput(){
    let input = getInput('./Day-13-input.txt');
    let newInput = [];

    for (let line of input){
        let newLine = JSON.parse('[' + line + ']');
        newInput.push(newLine);
    }
    
    return newInput.flat();
}

console.log(refinedInput())