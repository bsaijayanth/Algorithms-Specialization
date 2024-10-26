/*
random linear selection ith iteration
input: array of n numbers and ith smallest element in the array
random pivot and one subproblem division and find .. should be O(n)
*/ 


const getRandom = (min,max) => {
    return Math.floor(Math.random()* (max -min) + min );
}


const swap = (arr,i,j) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
} //TODO: to check if smarter array swap is there

const partition = (arr,l,r) => {

    //first no. pivot
    // let p = arr[l]; 


    // random pivot...
    let rand = getRandom(l,r);
    let p = arr[rand];
    swap(arr,rand,l);

    let pivotIndex = l+1;
    
    for( let i = l+1; i< r; i++) {
        if(arr[i] > p) {
            //do nothing;
        } else {
            swap(arr,pivotIndex,i)
            pivotIndex++;
        }
    }
    swap(arr,l,pivotIndex-1);
    return pivotIndex-1;
    
}

// console.log(partition([1,2,12,14],2,4));

const randomSelect = (arr,l,r,k) => {

    if(r-l === 1) {
        console.log('found1 :', arr[l]);
        return arr[l];
    }
    
    const pivotIndex  = partition(arr,l,r);
    const absoluteK = l+k-1;
    
    if(pivotIndex == absoluteK) {
        console.log('found2 :', arr[pivotIndex]);
        return arr[pivotIndex];
    }
    
    if(pivotIndex > absoluteK) {
        randomSelect(arr,l,pivotIndex, k);
    } else if (pivotIndex < absoluteK) {
        randomSelect(arr,pivotIndex+1, r, k-(pivotIndex-l+1))
    }
}


const input = [10,8,2,4,5,12,13];
const result = randomSelect(input,0,input.length, 6);

