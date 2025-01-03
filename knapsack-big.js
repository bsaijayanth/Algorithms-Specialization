const fs = require('fs');

(async function name(params) {
   
    const file = fs.readFileSync('input-knapsack-big', 'utf-8');
    const data = file.split("\n").map(e => e.split(" ").map(Number));
    const [weightLimit, items ] = data[0];
    data.shift();

    const ans = new Map();

    function ks(item, limit) {
        if(item == 0 || limit ==0 ) return 0;
        const [value, weight] = data[item-1];

        if(ans.has(item) && ans.get(item).has(limit)) {
            return ans.get(item).get(limit);
        }
        
         const val1 = ks(item-1, limit);
         const val2 = limit - weight >=0 ? ks(item-1, limit - weight) + value : 0;
         result = Math.max(val1, val2);
        if(!ans.has(item)) {
            ans.set(item, new Map());
        }
       ans.get(item).set(limit, result);
        return result;
    }

    const resultFinal = ks(items, weightLimit)

    console.log('result=',ans.get(items).get(weightLimit));
    console.log('result =', resultFinal);
})()