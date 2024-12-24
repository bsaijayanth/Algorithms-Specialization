const fs = require('fs');

const twoSum = (arr) => {
    const hashTable = new Map();
    const resultTable = new Map();
    let loopVal, currCompare;

    for(let i =0 ; i < arr.length; i++) {
        loopVal = arr[i];
        if(hashTable.has(loopVal)) continue;
        for(let t=-10000; t <= 10000; t++) {
            currCompare = t - loopVal;
            if( hashTable.has(currCompare)) resultTable.set(currCompare+loopVal,true);
        }
        hashTable.set(loopVal,true);

        console.log(`hash table: ${hashTable.size}, resultsTable: ${resultTable.size}`);
    }

    return resultTable.size;
}

(async function name(params) {
   const file = fs.readFileSync('./input-two-sum', 'utf-8');
   const data = file.split("\n").map(e => Number(e));

   console.log(twoSum(data));
    
}())