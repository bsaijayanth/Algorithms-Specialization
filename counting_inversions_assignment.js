// const arr = [4,1,2,3,9,7]; 4,1 4,2 4,3 7,9
const fs = require('fs');
const { type } = require('os');

const path='./test-input.js';

const readFile = async (path) => {
    const data = await fs.promises.readFile(path, 'utf8');

    return data;
}

let COUNT_GLOBAL = 0;

(async () => {
    const result = await readFile(path);
    let arr = result.split('\n');
    arr = arr.map(i => parseInt(i,10));
    

    const count_split_inversions = (x,y) => {

       const merged_array = [];

       for( let i=0, j=0, k=0; k < x.length + y.length; k++) {
            if( i === x.length) {
                merged_array.push(y[j]);
                j++;
                continue;
            }

            if( j === y.length) {
                merged_array.push(x[i]);
                i++;
                continue;
            }

            if(x[i] < y[j]) {
                merged_array.push(x[i]);
                i++;
                continue;
            }

            if(x[i] > y[j]) {
                merged_array.push(y[j]);
                j++;
                // console.log('global update',COUNT_GLOBAL)
                COUNT_GLOBAL = COUNT_GLOBAL +( x.length-i);
                continue;
            }
       }
       return merged_array;

    }


const count_inversions = (arr) => {
    if( arr.length === 1) {
        return arr;
    }

    const leftInversions = count_inversions(arr.slice(0,arr.length/2));
    const rightInversions = count_inversions(arr.slice(arr.length/2,arr.length));

    const splitInversions = count_split_inversions(leftInversions, rightInversions);

    return splitInversions;
}

count_inversions(arr);

console.log(COUNT_GLOBAL);



   
})()


