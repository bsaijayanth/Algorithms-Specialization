const fs = require('fs');
const readFile = async (path) => {
    const data = await fs.promises.readFile(path, 'utf8');
    return data;
}
let input ;

const swap = (arr, i1, i2) => {
    const temp = arr[i1];
    arr[i1] = arr[i2];
    arr[i2] = temp;
    return arr; 
}

const findSmallKid = (arr,curr) => {
    let kidsIndex = curr*2+1;
    if(!arr[kidsIndex+1]) return kidsIndex;

    return arr[kidsIndex] < arr[kidsIndex+1] ? kidsIndex : kidsIndex+1;
}

const checkbiggerThanKids = (arr,idx) => {
    let kidsIndex = idx*2+1;
    let flag = true;
    if( arr[kidsIndex] && arr[kidsIndex] > arr[idx]) flag = false;
    if( arr[kidsIndex+1] && arr[kidsIndex+1] > arr[idx]) flag = false; 

        return flag;
}

const checkSmallerThankKids = (arr,idx) => {
    let kidsIndex = idx*2+1;
    let flag = true;
    if( arr[kidsIndex] && arr[kidsIndex] < arr[idx]) flag = false;
    if( arr[kidsIndex+1] && arr[kidsIndex+1] < arr[idx]) flag = false; 

        return flag;
}

const findBigKid = (arr,curr) => {
    let kidsIndex = curr*2+1;
    if(!arr[kidsIndex+1]) return kidsIndex;

    return arr[kidsIndex] > arr[kidsIndex+1] ? kidsIndex : kidsIndex+1;
}

const median = () => {
    const minHeap = [];
    const maxHeap = [];
    const extractMin = () => minHeap[0];
    const extractMax = () => maxHeap[0];

    let result = 0;

    const minHeapify = (idx) => {
        let parentIndex = idx %2 === 0 ? (idx/2) -1 : Math.floor(idx/2);
        if(parentIndex < 0  || minHeap[parentIndex] <= minHeap[idx]) return;
            swap(minHeap,idx, parentIndex);
            if(parentIndex) minHeapify(parentIndex);
    }

    const maxHeapify = (idx) => {
        let parentIndex = idx %2 === 0 ? (idx/2) -1 : Math.floor(idx/2);
        if(parentIndex < 0  || maxHeap[parentIndex] >= maxHeap[idx]) return;
            swap(maxHeap, parentIndex, idx);
            if(parentIndex)  maxHeapify(parentIndex);
    }

    const minHeapifyRoot = (idx) => {
        if(idx >= minHeap.length || checkSmallerThankKids(minHeap, idx)) return;
        const smallKid = findSmallKid(minHeap, idx);
        swap(minHeap, smallKid, idx);
         minHeapifyRoot(smallKid);
        return minHeap;
    }

    const maxHeapifyRoot = (idx) => {
        if(checkbiggerThanKids(maxHeap, idx) ) return;   
        const bigKid = findBigKid(maxHeap,idx);
        swap(maxHeap,bigKid,idx);
        maxHeapifyRoot(bigKid);
    }

    const shiftMax = () => {
        swap(maxHeap,0,maxHeap.length-1);
        const temp = maxHeap.pop();
        maxHeapifyRoot(0);
        minHeap.push(temp);
        minHeapify(minHeap.length-1);
    }

    const shiftMin = () => {

        swap(minHeap, 0, minHeap.length -1);
        const temp = minHeap.pop();
        minHeapifyRoot(0);
        maxHeap.push(temp);
        maxHeapify(maxHeap.length - 1);
    }

    const rebalance = () =>  {
        if( maxHeap.length === minHeap.length || maxHeap.length -1 === minHeap.length) {
            return;
        } else {
            if(maxHeap.length > minHeap.length) {
                shiftMax();

            } else {
                shiftMin();
            }
        }
    }

    for(let i = 0; i < input.length; i++) {
        if(maxHeap.length ===0 || input[i] < extractMax()) {
            maxHeap.push(input[i]);
            maxHeapify(maxHeap.length -1);
            rebalance();
        } else 
        if(minHeap.length ===0 || input[i] > extractMin()) {

            minHeap.push(input[i]);
            minHeapify(minHeap.length -1);
            rebalance();
        } else
        if(input[i] < extractMin() && input[i] > extractMax()) {
            if(minHeap.length === maxHeap.length) {
                maxHeap.push(input[i]);
                maxHeapify(maxHeap.length -1);
            }
            else {
                //push into minHeap
                minHeap.push(input[i]);
                minHeapify(minHeap.length -1);
            }
        }

        result += maxHeap[0];
    }

    console.log('result and input', result, input.length);
    console.log(result % input.length);
}

(async () => {
    let data = await readFile("./input-median-maintenance");
    input = data.split("\n").map((e) => Number(e));
    median();
})();
