const fs = require('fs');

class UnionFind {
  constructor(size) {
    this.parent = Array.from({ length: size}, (_,i) => i);
    this.rank = Array(size).fill(1);
  }

  find(x) {
    if(this.parent[x] != x) {
      this.parent[x] = this.find(this.parent[x]);
    }

    return this.parent[x];

  }

  // union(a,b) {
  //   let p1 = this.find(a);
  //   let p2 = this.find(b);
  //   if(p1 === p2) return;

  //   if(this.count[p1] < this.count[p2]) {
  //     this.parent[a] = p2;
  //     this.count[b] += this.count[a]; 
  //   } else {
  //     this.parent[b] = p1;
  //     this.count[a] += this.count[b];
  //   }
  // }
  union(a, b) {
    let rootA = this.find(a);
    let rootB = this.find(b);

    if (rootA === rootB) return;

    // Union by rank
    if (this.rank[rootA] > this.rank[rootB]) {
      this.parent[rootB] = rootA;
    } else if (this.rank[rootA] < this.rank[rootB]) {
      this.parent[rootA] = rootB;
    } else {
      this.parent[rootB] = rootA;
      this.rank[rootA]++;
    }
  }

  countClusters() {
    let s = new Set();
    for( let i=0; i < this.parent.length; i++) {
      s.add(this.find(i));
    }
    return s.size;
  }

}


(async function name(params) {
  const file = await fs.readFileSync('input-cluster-big', 'utf-8');
  const data = file.split("\n");
  const [nodes, bits] = data[0].split(" ").map(e => Number(e));

  let clustersCount = nodes;
  const combinations = new Set();

  const visitedNodes = new Map();

  const flip = (val) => val === '0' ? '1' : '0';

  let flip1, flip2;

  // const storeCombinations = (node_bits, index) => {
  //   if(combinations.has(node_bits.join(""))) {
  //      combinations.get(node_bits.join("")).push(index);
  //   } else {
  //       combinations.set(node_bits.join(""), [index])
  //   }
  //   for(let i =0; i < bits; i++) {
  //           flip1 = [...node_bits];
  //           flip1[i] = flip(node_bits[i]);
  //           // combinations.add(flip1.join(""));
  //           if(combinations.has(flip1.join(""))) {
  //               combinations.get(flip1.join("")).push(index);
  //            } else {
  //                combinations.set(flip1.join(""), [index])
  //            }
  //       for(let j = i+1; j < bits; j++ ) {
  //           flip2 = [...flip1];
  //           flip2[j] = flip(flip2[j]);
  //           // combinations.add(flip2.join(""));
  //           if(combinations.has(flip2.join(""))) {
  //               combinations.get(flip2.join("")).push(index);
  //            } else {
  //                combinations.set(flip2.join(""), [index])
  //            }
  //       }
  //   }
  // }
  
  const getCombinations = (node_bits) => {
    combinations.clear();
    combinations.add(node_bits.join(""));
    for(let i =0; i < bits; i++) {
            flip1 = [...node_bits];
            flip1[i] = flip(node_bits[i]);
            combinations.add(flip1.join(""));
        for(let j = i+1; j < bits; j++ ) {
            flip2 = [...flip1];
            flip2[j] = flip(flip2[j]);
            combinations.add(flip2.join(""));
        }
    }
    return combinations
  }

  // const flipBits = (node, bits) => {
  //   const combinations = new Set();
  //   combinations.add(node);
  
  //   // Flip 1-bit
  //   for (let i = 0; i < bits; i++) {
  //     const flipped1 = node ^ (1 << i);
  //     combinations.add(flipped1);
  
  //     // Flip 2-bits
  //     for (let j = i + 1; j < bits; j++) {
  //       const flipped2 = flipped1 ^ (1 << j);
  //       combinations.add(flipped2);
  //     }
  //   }
  //   return combinations;
  // };

  data.shift();
  let loopNode;
  let loopCombinations;
  const uf = new UnionFind(nodes);
  for(let i =0; i < nodes; i++) {
        loopNode = data[i].split(" ");//array
        loopCombinations = getCombinations(loopNode);

        for(const c of loopCombinations) {
          if(visitedNodes.has(c)) {
            uf.union(i,visitedNodes.get(c));
          }
        }
        visitedNodes.set(loopNode.join(""), i);

        // if(combinations.has(loopNode.join(""))) {
        //       let matches = combinations.get(loopNode.join(""));
        //       for(let j=0; j < matches.length; j++) {
        //         uf.union(i,j);
        //       }
        // }
        // storeCombinations(loopNode, i+1);
        if (i % 10000 === 0) {
          console.log(`own Processed ${i} nodes...`);
        }
  }

  console.log("resut =", uf.countClusters());

})()



  