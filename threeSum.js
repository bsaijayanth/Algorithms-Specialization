// 
const nums = [18,1, 2, 3, 5, 6, 11, 15, 16, 17, 1];
const target = 20 


const threeSum = (nums, target) => {

   nums.sort((a,b) => a-b);

   let k = nums.length -1;

   for(let i=0; i< nums.length; i++) {
    for(let j=i+1; j < k; j++) {
        for(k = nums.length-1; k >=0; k--) {
            let curr = nums[i] + nums[j] + nums[k]
            if(curr === target) {
                return true;
            }
            if(curr < target) {
                j++;
            }
        }
    }
   }

}

threeSum(nums, target);