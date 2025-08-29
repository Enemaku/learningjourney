function countVowels(string) {
  const vowels = "aeiouAEIOU"
  let number = 0
  for (let i = 0; i < string.length; i++) {
    if (vowels.includes(string[i])){
      number++;
    }
  }
  return number;
}

console.log(countVowels("hello"));
console.log(countVowels("pneumonia")); 