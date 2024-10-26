const swap = (arr, i, j) => {
    const temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
}

const partition = (arr, l, r) => {
    if( l == r) {
        return l;
    }
    let i = l+1;

    let p = arr[l];// TODO: to make it random pivot... 

    for( let q = i; q < r; q++) {
        if( arr[q] < p) {
            swap(arr,i, q);
            i++;
        }
        
    }
    swap(arr,l, i-1);
    console.log('returning in partition', i-1, 'for', arr,l,r)
    return i-1;
}

const randomSelect = (arr,l,r,k) => {
    console.log('in random select',arr,l,r,k);
    // if( l== r ) {
    //     return;
    // }

  
    let pivotIndex = partition(arr,l,r);
    console.log('after partition pivotIndex=',pivotIndex,k);
    if(pivotIndex == k-1) {
        console.log("--------found:", arr[k-1])
        return arr[pivotIndex]
    } else if (pivotIndex < k-1){
        randomSelect(arr,pivotIndex+1, r, k-(pivotIndex +1))
    }
    else {
        randomSelect(arr,l,pivotIndex, k);
    }
    
}


let input;
(async () => {
    // let arr1 = await readFile("./input-quicksort.js");
    // input = arr1.split("\n");
    input = [8,3,4,1,2,7,6,5];
    randomSelect(input, 0, input.length, 3);
    console.log('after randomSelect', input);
    // console.log('after randomSelect', input[0], input[9910], input[9999]);
    // console.log(TOTAL_COMPARISONS);
})()