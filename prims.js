const fs = require('fs');

const edgeListToAdjacentList = (arr) => {
    let graph = new Map();
    let loopVal;
    for(let i =0; i < arr.length; i++) {
        loopVal = arr[i];
        if(graph.has(loopVal[0])) {
            graph.get(loopVal[0]).push([loopVal[1], loopVal[2]]);
        } else {
            graph.set(loopVal[0], [[loopVal[1], loopVal[2]]]);
        }

        if(graph.has(loopVal[1])) {
            graph.get(loopVal[1]).push([loopVal[0], loopVal[2]]);
        } else {
            graph.set(loopVal[1], [[loopVal[0], loopVal[2]]]);
        }
    }
    console.log(graph);
    return graph;

}

const getCheapEdge = (graph, visited) => {

    let curr_best
    let global_cheap_value = Infinity;

    let edge_list;

    for(const node of visited) {
        console.log('looking for edges of', node);
        
        edge_list = graph.get(node) || [];
        // console.log('----------> edgelist for', edge_list, node );
        for(let i =0; i< edge_list.length; i++) {
            
            if(visited.has(edge_list[i][0])) continue;

            console.log('---> comapring', edge_list[i][1], global_cheap_value );
            if(edge_list[i][1] < global_cheap_value){
                curr_best = edge_list[i][0];
                global_cheap_value = edge_list[i][1];
                console.log('updating global_cheap_value', global_cheap_value );
            }
        }
    }
    // console.log('returning edge', {index: curr_best, value: global_cheap_value})
    return {index: curr_best, value: global_cheap_value};
}


(async function name(params) {
   const file = fs.readFileSync('input-prims', 'utf-8');
   const fullFile = file.split("\n");

   const data = fullFile.slice(1).map((e) => e.split(" ").map((a) => Number(a)));
//    console.log(data);

   const al = edgeListToAdjacentList(data);

  const X = new Set();
  let result = 0;

  X.add(1);// initialising algo with first vertex

  while(X.size < al.size) {

    const {index, value} = getCheapEdge(al,X);
    console.log('adding', index);

    X.add(index);
    console.log('result was', result, 'addinbg', value)
    result += value;
  }

console.log('result=',result);

})()