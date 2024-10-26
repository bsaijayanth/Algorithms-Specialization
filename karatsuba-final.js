let m1 = '3141592653589793238462643383279502884197169399375105820974944592';
//31415926535897932384626433832795
//02884197169399375105820974944592
let m2 = '2718281828459045235360287471352662497757247093699959574966967627';
//27182818284590452353602874713526
//62497757247093699959574966967627

let n1 = '1024';
let n2 = '2048';

const divide = n => {
    const mid = n.length /2;
    const a = n.slice(0, mid);
    const b = n.slice(mid);
    return {a,b}
}

const b10 = n => BigInt(10 ) ** BigInt(n);

const karat = (x,y) => {
    if(x.length === 1 && y.length === 1) {
        return Number(x) * Number(y);
    }
    const n = x.length;
    const {a,b } = divide(x);
    const {a:c , b:d} = divide(y);
    const f = (b10(n)* BigInt(karat(a,c)));
    const m =  (b10(n/2) * (BigInt(karat(a,d)) + BigInt(karat(b,c))));
    const l = BigInt(karat(b,d));
    
    console.log('fml,', f,m,l);
    const result = String( f +  m + l);

    console.log('x,y,result',x,y,result)
    return result;
}

karat(m1,m2);