/* 
if single element return
choose a pivot
partition the array s.t <p p >p
recursively call <p
recuresively call >p
*/

let TOTAL_COMPARISONS = 0;

const fs = require('fs');
const readFile = async (path) => {
    const data = await fs.promises.readFile(path, "utf8");
    return data;
}

const swap = (arr,i,j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

const findMiddleNumber = (a,b,c) => {
    const nums = [a,b,c];
    nums.sort((a,b) => a-b);
    return nums[1];
}

const medianPivot = function(arr,left,right) {
    let m ;
    const medianMap = new Map();
    const no_of_elements = right - left;

    if(no_of_elements  % 2 === 0) {
         m = arr[((no_of_elements)/2)-1+left];
         medianMap.set(m,((no_of_elements)/2)-1+left)
    } else {
         m = arr[((no_of_elements+1)/2)-1+left];
         medianMap.set(m,((no_of_elements+1)/2)-1+left)
    }

    const a = arr[left];
    medianMap.set(a,left)
    const z = arr[right-1];
    medianMap.set(z,right-1);
    const result = findMiddleNumber(a,m,z);


    return {
        pivot: result,
        pivotIndex: medianMap.get(result)
    }
}


const partition = (arr, left, right) => {
    let i = left+1;
    // let p = arr[left]; first element

    //pivot last element
    // let p = arr[right-1];
    // swap(arr,left,right-1);

    //pivot median
    const {pivot:p, pivotIndex} = medianPivot(arr,left,right)
    swap(arr,left,pivotIndex);


    for ( let k = left; k< right; k++) {
        if( arr[k] < p) {
            swap(arr,k,i);
            i++;
        }
    }
    swap(arr,left,i-1);
    return i-1;
}

/* 
8,5,2,3,4,1,7,6

6,5,2,3,4,1,7,8
*/

const quickSort = (arr, left, right) => {

    const partArr = partition(arr, left, right);
    TOTAL_COMPARISONS += (right - left -1); 
    if(arr.slice(left,partArr).length > 0) {
        quickSort(arr,left,partArr)
    }
    if( arr.slice(partArr+1, right).length > 0) {
        quickSort(arr,partArr+1, right);
    }
}


let input;
(async () => {
    let arr1 = await readFile("./input-quicksort.js");
    input = arr1.split("\n");
    input = input.map(i => parseInt(i, 10));
    quickSort(input, 0, input.length);
    console.log('after qs', input);
    console.log('after qs', input[0], input[9910], input[9999]);
    console.log(TOTAL_COMPARISONS);
})()


// first element pivot -> 162085
//last element pivot -> 164123
//median element pivot -> 159894, 159948, 138382
