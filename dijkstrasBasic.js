//4347,5148,4482,5164,2367,3996,4457,4039,3139,5165
/* 2599
2610
2947
2052
2367
2399
2029
2442
2505
3068
982 */

const fs = require('fs');
const readFile = async (path) => {
    const data = await fs.promises.readFile(path, "utf8");
    return data;
}

const graph = new Map();
let X = new Set();
let A=[];



const findNextEdge = () => {
    //find the best edge from X to V-X
    let global_best = Infinity;
    let global_head ;
    let global_tail;
    let curr_best = Infinity;
    let curr_head ;
    let edge_list ;
    for(const node of X) {
        edge_list = graph.get(node);
        // edge_list.sort((a,b) => a[1] - b[1]);
        curr_best = Infinity;
        curr_head  = null;

        for(let i =0; i< edge_list.length; i++) {
            if(X.has(edge_list[i][0])) {
                continue;
            }
            if(edge_list[i][1]+ A[node] < curr_best) {
                curr_best = edge_list[i][1] + A[node];
                curr_head = edge_list[i][0];
            }
        }

        if( curr_best < global_best) {
            global_best = curr_best;
            global_head = curr_head;
            global_tail = node;
        }
    }
    // console.log('head= ', global_head);
    // console.log('tail= ', global_tail);
    // console.log('dist= ', global_best);
    A[global_head] = global_best;
    // console.log('found edge:', global_tail,"->", global_head);
    return{tail: global_tail, head: global_head};
}



const computeShortestPath = () => {


    //initialise dijkstras
    X.add( Array.from(graph)[0][0]);
    // console.log('first node', Array.from(graph)[0][0]);
    A[ Array.from(graph)[0][0]] = 0;


    while(X.size < graph.size) {
        let {tail, head} = findNextEdge();
        X.add(head);
        // console.log('adding to x:', head);
    }

    

    // let {tail, head} = findNextEdge();
    // console.log('A = ',A)
    // console.dir(A, {'maxArrayLength': null});
    console.log(A[7]);
    console.log(A[37]);
    console.log(A[59]);
    console.log(A[82]);
    console.log(A[99]);
    console.log(A[115]);
    console.log(A[133]);
    console.log(A[165]);
    console.log(A[188]);
    console.log(A[197]);



}

(async function main() {
    let inp = await readFile('dijkstra-data.txt');
    inp = inp.split("\n");
    // console.log(inp.length);
    for(const line of inp) {
      let temp =  line.split("\t");
        // console.log(temp);
        for(let i = 1; i< temp.length; i++) {
            if(temp[i].length === 0) continue;
            // console.log('split=', temp[i].split(","));
            if(graph.has(parseInt(temp[0]))) {
                graph.set(parseInt(temp[0]), [...graph.get(parseInt(temp[0])), [...temp[i].split(",").map(a => parseInt(a))]])
            } else {

                graph.set(parseInt(temp[0]), [[...temp[i].split(",").map(a => parseInt(a))]])
            }
        }
    }
    // console.log(graph);
    computeShortestPath();

    // console.log(findVertex([ 80, 917 ],   [ 33, 652 ],
    //     [ 26, 5553 ],  [ 72, 8782 ],
    //     [ 101, 5024 ], [ 108, 4342 ],
    //     [ 132, 5383 ], [ 116, 8036 ],
    //     [ 184, 4999 ], [ 88, 7322 ],
    //     [ 105, 3388 ], [ 187, 6332 ],
    //     [ 190, 697 ],  [ 136, 1984 ],
    //     [ 96, 712 ],   [ 91, 4626 ],
    //     [ 103, 5248 ]));
})();