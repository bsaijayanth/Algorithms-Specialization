const inp = [1,6,5,9,22,1,6,8,0];

const mergeArrays = (left, right) => {
    let result = [];
    
    for(let i =0, j=0, k=0; k < left.length+right.length ; k++) {
        if(right[j] == undefined){
            result.push(left[i]);
            i++;
            continue;
        } 
        if(left[i] == undefined){
            result.push(right[j]);
            j++;
            continue;
        } 

        if(left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result;  
}

const mergeSort = ( arr) =>{
    if(arr.length ==1) {
        return arr;
    }
    const leftHalf = mergeSort(arr.slice(0,arr.length/2));
    const righHalf = mergeSort(arr.slice(arr.length/2, arr.length));
    return mergeArrays(leftHalf, righHalf);
}

console.log(mergeSort(inp));
//nlogn
