const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let largestNumber = numbers[0];
for(let i = 0; i < numbers.length; i++) {
  if(numbers[i] > largestNumber){
    largestNumber = numbers[i];
  }
}
console.log(largestNumber);