const { getInput } = require("../input.js");

/** Explanation and Approach 
 * 
 * Part I: I had help... 
 * 
 * first is to take the input and build a graph with
 * Nodes having the coordinates, height, distance, visted and edges. 
 * 
 * 
 * Next is to set the start and ending coords. 
 * and perform a BFS search throughout the graph.
 * We only visit the nodes where their height is equal or 1 greater
 * 
 * 
*/

let input = getInput("./Day-12-input.txt");
let start, end;
let edges = [
	[0, -1],
	[0, 1],
	[-1, 0],
	[1, 0]
]
let graph = buildMap(input);

graph.forEach(row => {
	row.forEach(node => {
		edges.forEach(edge => {
			if (graph[node.y + edge[1]]){
				let n = graph[node.y + edge[1]][node.x + edge[0]]
				n && node.edgeNodes.push(n);
			}
		});
	});
});

console.log(graph);


function hillClimbing(n) {
	n.distance = 0;
	let q = [n];
	let solution = -1;

	while (q.length){
		let node = q.shift();
		for (let edge of node.edgeNodes){
			if (!edge.visited && (node.height - edge.height) < 2){
				let distance = node.distance + 1;

				if ((edge.x === 0 && edge.y === start.y && solution === -1)){
					solution = distance;
				}

				edge.distance = distance;
				edge.visited = true;
				q.push(edge);
			}
		}
	}

	return solution;
}


function buildMap(grid){
	let map = grid.map((row, y) => {
		return row.split('').map((char, x) => {
			let node = {
				x, 
				y,
				visited : false,
				distance : Infinity,
				height : char.charCodeAt(0) - 96,
				edgeNodes : [],
			}

			if (char === 'S'){
				node.height = 1;
				start = node;
			} 

			if (char === 'E'){
				node.height = 26;
				end = node;
			}

			return node;
		});
	});
	return map;
}

console.log(hillClimbing(end));


