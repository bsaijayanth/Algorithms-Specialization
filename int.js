//Promise.all mimic 
//

const p1 = new Promise((resolve, reject) => {
     resolve('1');
})

const p3 = 11;

const p4 = Promise.reject(0);

const p2 = new Promise((resolve, reject) => {
     resolve('2');
})

const input = [p1,p4, p2,p3];

const customPromiseAll = (input) => {

    return new Promise((res, rej) => {

    let results = [];
    let completed = 0;


  for(let i =0; i < input.length; i++) {


    try {
        console.log('in try', input[i]);
         Promise.resolve(input[i]).then((val) => {
            console.log('in promise',val,i);
            results[i] = val;
            completed++;
            console.log('in promise results',results);
            if(completed === input.length) {
                res(results);
            }
         }).catch(e => {
            console.log( 'in promise catch',e);
            rej(e);
         })

    } catch (e) {
        console.log('error in catch',e);
        return false;
    }

  }
  console.log('fucntion return for loop ended',)
});





  
}

customPromiseAll(input).then((res) => {
    console.log('final',res);
}).catch( e => {
    console.log('grand catch', e)
})
