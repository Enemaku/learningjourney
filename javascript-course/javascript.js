var names = ["Alice", "Bob", "Charlie", "David", "Eve"];

for ( var c of names) {
  console.log(c);
}

for (var i = 0; i <= 10 ; i++) {
  console.log(i);
}
const map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function(n) {
  return n % 2 === 0;
});

console.log(map);


const filter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(function(n) {
  return n % 2;
});

console.log(filter);
