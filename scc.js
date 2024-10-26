const fs = require('fs');
const readFile = async (path) => {
    const data = await fs.promises.readFile(path, "utf8");
    return data;
}

const reverseGraph = (graph) => {
    return graph.map(a => a.reverse());
}

const result = new Map();

const newGraph = new Map();
const newGraphRev = new Map();

let finishingMap = new Map();

let finishingNumber =  0;

let second_loop_count = 0;

let visitedNodes = new Array(875715).fill(false);
let count_Scc_members =0;
let scc_leader;

const sortGraph = (G) => {
    const entries = [...G];
    entries.sort((a,b) => b[0] - a[0]);
    return new Map([...entries]);
}

// const sortMap = (mapp) => {
//     const entries = [...mapp];
//     entries.sort((a,b) => b[0] - a[0]);
//     return new
// }

const dfs =  async (G, starting_vertex) => {
    if(!G.has(starting_vertex)) {
        visitedNodes[starting_vertex] = true;
        finishingNumber++;
        finishingMap.set(finishingNumber, starting_vertex );
        return;
    }
    visitedNodes[starting_vertex] = true;
    for (const edge of G.get(starting_vertex)) {
        if(!visitedNodes[edge]) {
            await dfs(G,edge);

        }
    }
    finishingNumber++;
    finishingMap.set(finishingNumber, starting_vertex );
}

const justDfs =  async (G, starting_vertex) => {
    if(!G.has(starting_vertex)) {
        visitedNodes[starting_vertex] = true;
        result.set(scc_leader, ++count_Scc_members);
        return;
    }
    visitedNodes[starting_vertex] = true;

    for (const edge of G.get(starting_vertex)) {

        if(!visitedNodes[edge]) {
             await justDfs(G,edge);

        }
    }
    result.set(scc_leader,++count_Scc_members);
}


const computeSccs = async () => {

   let Grev = sortGraph(newGraphRev)

   for(const [u, edges] of Grev.entries()) {
    // console.log(u, edges);
    if(!visitedNodes[u]) {
        // console.log('calling dfs from main',u);
        await dfs(Grev, u);
    }
   }

   let sortedFinishing = sortGraph(finishingMap);
//    console.log('sorted finishing map',sortedFinishing);

   visitedNodes.fill(false);

   for( const  [time, vertex] of sortedFinishing.entries())  {
        if(!visitedNodes[vertex]) {
            // console.log('-------------------calling scc', vertex);
            count_Scc_members =0;
            scc_leader = vertex;
            await justDfs(newGraph, vertex)
        }
   }

}

const sortMapByValue = (G) => {
    const entries = [...G];
    entries.sort((a,b) => b[1] - a[1]);
    return new Map([...entries]);
}

(async function main() {
    let inp = await readFile('./scc-test.js');
    inp = inp.split("\n");
    const graph = inp.map((a) => {
        // console.log('a=',a.split(' '));
        const [u,v] = a.split(" ");
        return [parseInt(u), parseInt(v)];
    });
        const adjacencyList = (graph) => {
            for(const edge of graph) {
                const [u,v] = edge;
                if(newGraph.has(u)) {
                    newGraph.set(u, [v,...newGraph.get(u)]);
                } else {
                    newGraph.set(u,[v]);
                }

                if(newGraphRev.has(v)) {
                    newGraphRev.set(v, [u,...newGraphRev.get(v)]);
                } else {
                    newGraphRev.set(v,[u]);
                }
            }
        }

// console.log(graph);
// console.log(reverseGraph(graph));

adjacencyList(graph);
// console.log(newGraph);
// console.log(newGraphRev);

// console.log(sortGraph(newGraph));
// console.log(sortGraph(newGraphRev));

   await  computeSccs();

// console.log('visited nodes', visitedNodes);
// console.log('finishingMap', finishingMap);
console.log('result', sortMapByValue(result));

})()