class Node {
    constructor(key, val) {
        this.key =key;
        this.val = val;
    }
}


class MinHeap {

    constructor() {
        this.nodes = [];
    }

    getParentIndex(index) {
        return Math.floor((index -1)/2);
    }

    getLeftChildIndex(index) {
        return 2*index + 1;
    }

    getRightChildIndex(index) {
        return 2*index + 2;
    }

    swap(i,j) {
        const temp = this.nodes[i];
        this.nodes[i] = this.nodes[j];
        this.nodes[j] = temp;
    }

    popMin() {
        const min = this.nodes[0];
        this.nodes[0] = this.nodes[this.nodes.length -1];
        this.nodes.pop();
        this.bubbleDown(0);
        return min;
    }

    checkSmallerThanChildren(index) {
        const left = this.getLeftChildIndex(index);
        const right = this.getRightChildIndex(index);
        let flag = true;
        if(left < this.nodes.length && this.nodes[left].key < this.nodes[index].key) flag = false;
        if( right < this.nodes.length && this.nodes[right].key < this.nodes[index].key) flag = false;
        return flag;


    }

    findSmallKid(index) {
        const left = this.getLeftChildIndex(index);
        const right = this.getRightChildIndex(index);
        if(!this.nodes[right]) return left;
        return this.nodes[left].key < this.nodes[right].key ? left : right;
    }

    insert(key, val) {
        const node = new Node(key, val);
        this.nodes.push(node);
        this.bubbleUp(this.nodes.length -1);
    }
    checkBiggerThanParent(idx) {
        const parent = this.getParentIndex(idx);
        if(this.nodes[idx].key >= this.nodes[parent].key) return true;
        return false;
    }

    bubbleUp(idx) {
        if(idx === 0 || this.checkBiggerThanParent(idx)) return;
        const parent = this.getParentIndex(idx);
        this.swap(idx, parent);
        this.bubbleUp(parent);
    }

    bubbleDown(index) {
        const count = this.nodes.length;

        if(index > (count >> 1) || this.checkSmallerThanChildren(index)) return;

        const kid = this.findSmallKid(index);
        this.swap(index, kid);
        this.bubbleDown(kid);
    }

    getSize() {
        return this.nodes.length;
    }

    printHeap() {
        console.log(this.nodes)
    }

    peek() {
        console.log('peeking heap', this.nodes[0]);
    }
}

export default MinHeap;


//Testing heap

// const h = new MinHeap();

// h.insert(1, null);
// h.printHeap();
// h.insert(3, null);
// h.printHeap();
// h.insert(0, null);
// h.printHeap();
// h.insert(2, null);
// h.printHeap();
// h.popMin();
// h.printHeap();