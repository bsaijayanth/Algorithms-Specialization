const fs = require('fs');
const Target_K = 4;//input

(async function name(params) {
  const file = await fs.readFileSync('input-clustering', 'utf-8');
  const data = file.split("\n");
  const nodes = Number(data[0]);
  
  data.shift();
  for(let i =0; i < data.length; i++) {
        data[i] = data[i].split(" ").map((e) => Number(e));
  }
  data.sort((a,b) => a[2] - b[2]);


  const clusterLeader = [...Array(nodes).keys().map(e => e+1)];
  const clusters = new Map();// to store cluster leader and the members
  for(let i =1; i <= nodes; i++) {
    clusters.set(i, [i]);
  }

  let loopCounter =0;
  let loopVal1, loopVal2;
  let p1Cluster, p2Cluster;

  const mergeCluster = (clId1, clId2) => {
    let clusterMembers = clusters.get(clId2);
    for(let i =0; i < clusterMembers.length; i++) {
        clusterLeader[clusterMembers[i]-1] = clId1;
        clusters.get(clId1).push(clusterMembers[i]);
    }
    clusters.delete(clId2);
  }

  let lastResult = -Infinity;

  while(clusters.size != Target_K) {
    loopVal1 = data[loopCounter][0];
    loopVal2 = data[loopCounter][1];
    p1Cluster = clusterLeader[loopVal1 - 1];
    p2Cluster = clusterLeader[loopVal2 - 1];
    if(p1Cluster != p2Cluster)  {
        if(clusters.get(p1Cluster).length >= clusters.get(p2Cluster).length ) {
            mergeCluster(p1Cluster, p2Cluster);
        } else {
            mergeCluster(p2Cluster, p1Cluster);
        }
        lastResult = data[loopCounter][2];
    }
    loopCounter++;
  }

  while( loopCounter < data.length) {
    loopVal1 = data[loopCounter][0];
    loopVal2 = data[loopCounter][1];
    p1Cluster = clusterLeader[loopVal1 - 1];
    p2Cluster = clusterLeader[loopVal2 - 1];

    if(p1Cluster != p2Cluster) {
        lastResult = data[loopCounter][2];
        break;
    }
    loopCounter++;
  }
  console.log("resut =", lastResult);
})()