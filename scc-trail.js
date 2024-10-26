const fs = require('fs');
const readFile = async (path) => {
    const data = await fs.promises.readFile(path, "utf8");
    return data;
}

const convertToAdjacencyList = (inp) => {
    const G = new Map();
    const temp =  inp.split("\n").map((p) => {
        console.log("point=",p.split(" ")[0], p.split(" ")[1])
        if(G.has(p.split(" ")[0])) {
            G.set(p.split(" ")[0], [...G.get(p.split(" ")[0]),p.split(" ")[1]])
        } else {
            G.set(p.split(" ")[0], [p.split(" ")[1]])
        }
    });
   console.log('G=',G);
}

// const transformer = async (inp) => {

//     return new Promise (async (resolve, reject) => {
//         const result = await inp.split("/n").map((edge) => {
//             // console.log('edge=', edge);
//             const [u, v] = edge.split(" ").map((vertex) => {
//                 // console.log('vertex=', vertex);
//                 return parseInt(vertex);
//             })
//         });
//         console.log(result);
//         resolve(result);
//     })
// }



(async function main() {
    let inp = await readFile('./scc-test-small.js');
    convertToAdjacencyList(inp);
        // const res = await transformer(inp).then((d) => console.log('d=',d));
        // console.log('res=',res);
        // console.log('res ends');
        DFS

})()