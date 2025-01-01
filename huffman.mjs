import fs from 'fs';
import MinHeap from './ds/minHeap.mjs';

class Node {
    constructor(key, left, right) {
        this.key = key;
        this.left = left;
        this.right = right;
    }
}

(async function name(params) {
   
    const file = fs.readFileSync('input-huffman', 'utf-8');
    const data = file.split('\n').map(Number);
    const symbols_count = data[0];
    data.shift();
    data.sort((a,b) => a-b);
    // console.log(data);

    //preProcessing - initialise nodes and putting in heap;
    const heap = new MinHeap();
    let loopNode;
    for(let i =0; i < data.length; i++) {
        loopNode = new Node(data[i]);
        heap.insert(data[i], loopNode);
    }

    const mergeSubTrees = (t1, t2 ) => {
        const node = new Node(t1.key+t2.key, t1.val, t2.val);
        return node;
    }

    const parseSubTree = (tree) => {
        if(!tree) return [0,0];
            let [minLeft, maxLeft] = parseSubTree(tree.left);
            let [miRight, maxRight] = parseSubTree(tree.right);
        return [Math.min(minLeft, miRight) +1 , Math.max(maxLeft, maxRight)+1];
    }


    let loopCount = 0;
    let min1, min2;
    let merged;

    while(heap.getSize() > 1) {
        min1 = heap.popMin();
        min2 = heap.popMin();

        if(min1.key <= min2.key) {
             merged = mergeSubTrees(min1, min2);
        } else {
            merged = mergeSubTrees(min2, min1);
        }

        heap.insert(min1.key+min2.key, merged);
        loopCount++;
        // heap.peek();
    }

    const finalSubTree = heap.popMin();
    const [min, max] = parseSubTree(finalSubTree.val);
    console.log('min max', min-1, max-1)
    
})()
