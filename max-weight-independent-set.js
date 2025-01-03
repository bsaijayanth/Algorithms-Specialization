const fs = require('fs');

(async function name(params) {
   
    const file = fs.readFileSync('input-max-weight-independent-set', 'utf-8');
    const data = file.split('\n').map(Number);
    const nodes_count = data[0];
    data.shift();

    const A = [];
    A[0] =0;

    A[1] = data[0];


    for(let i=2; i < data.length; i++) {
            A[i] = Math.max(A[i-1], A[i-2]+data[i-1]); 
    }

    let result = [];

    let i = A.length;
    while(i >=1) {
        if(A[i-1] > A[i-2] + data[i-1]) {
            --i;
        } else {
            result.push(i);
            --i;
            --i;
        }
    }
console.log(result);

console.log(result.includes(1));
console.log(result.includes(2));
console.log(result.includes(3));
console.log(result.includes(4));
console.log(result.includes(17));
console.log(result.includes(117));
console.log(result.includes(517));
console.log(result.includes(997));

}

)()