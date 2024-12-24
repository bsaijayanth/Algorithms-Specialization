const fs = require('fs');

const schedule = (arr) => {
    arr.sort((a,b) => {
        if(b[2] === a[2]) return b[0] - a[0]
        return b[2] - a[2]
    });
    return arr;
}

const getResult = (arr) => {
    let result = 0;
    let completionTime = 0;
    for(let i =0; i < arr.length; i++) {
        completionTime += arr[i][1];
        result += arr[i][0] * (completionTime);
    }
    console.log(result);
}

(async function(params) {
    const file = await fs.readFileSync('input-scheduling-jobs', 'utf-8');
    const data = file.split('\n');
    let loopVal;
    let wnl = []

    for(let i = 1; i < data.length; i++) {
        loopVal = data[i].split(' ').map(a => Number(a));
        // loopVal.push(loopVal[0] - loopVal[1]);// for difference 
        loopVal.push(loopVal[0]/loopVal[1]); // for ratios
       wnl.push(loopVal);
    }
    const sched = schedule(wnl);
    getResult(sched);
})();
