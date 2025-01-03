const fs = require('fs');

(async function name(params) {
   
    const file = fs.readFileSync('input-knapsack', 'utf-8');
    const data = file.split("\n").map(e => e.split(" ").map(Number));
    const [weightLimit, items ] = data[0];
    data.shift();

    let ans = Array.from({ length: items+1}, () => new Array(weightLimit+1).fill(0));
    for(let w=0; w <= weightLimit; w++) {
        ans[0][w] = 0;
    }

    for(let i=1; i <= items; i++ ) {
        const [loopItemValue, loopWeight] = data[i-1];
        
        for(let w = 1; w <= weightLimit; w++) {
            if(w - loopWeight >= 0) {
                ans[i][w] = Math.max(ans[i-1][w], ans[i-1][w - loopWeight]+ loopItemValue);
            } else {
                ans[i][w] = ans[i-1][w];
            }

        }
    }
    console.log('result=',ans[items][weightLimit]);
})()