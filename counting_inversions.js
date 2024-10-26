/* 
    given array A  .... give no. of inversionss.. pairs
    inversions are for element i,j where i <j and A[i] > A[j].
*/

// i1 = [1,3,5,2,4,6]; -> (3,2) (5,2) (5,4)

// const i1 = [1,3,5,2,4,6];

// const i1 = [1,2,3,4,5,6];

const i1 = [6,5,4,3,2,1];

// const i1 = [1,2,3,4,6,5,7];

let COUNT_GLOBAL =0;

function count_split_inversions (a1,a2) {

    let result = [];
    let i=0; 
    let j = 0;
    let split_count = 0;

    for (let i=0, j=0, k=0; k < a1.length +a2.length; k++) {

        if( a1[i] === undefined) {
            result.push(a2[j]);
            j++;
            continue;
        } 

        if( a2[j] === undefined) {
            result.push(a1[i]);
            i++;
            continue;
        } 

        if( a1[i] <= a2[j]) {
            result.push(a1[i]);
            i++;
            continue;
        } 

        if(a1[i] > a2[j]) {
            result.push(a2[j]);
            split_count = split_count + (a1.length-i);
            j++;
            continue;
        }
    }
    return {result, split_count};

}

const  count_inversions = (inp) => {
    console.log('inp=',inp);
    if(inp.length === 1) return inp;

    const x = count_inversions(inp.slice(0,Math.floor(inp.length/2)));
    const y = count_inversions(inp.slice(Math.floor(inp.length/2),inp.length));
    const {result, split_count} = count_split_inversions(x,y);
    
    // console.log(x,y);
    // console.log('split_count=',split_count)
    COUNT_GLOBAL = COUNT_GLOBAL +split_count;
    // console.log(COUNT_GLOBAL);
    return result;
}

console.log(count_inversions(i1));
console.log(COUNT_GLOBAL);
