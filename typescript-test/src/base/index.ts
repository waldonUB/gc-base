const arr: [number, number,number] = [1,2,3]
for (let i of arr) {
  setTimeout(() => {
    console.log(i);
  }, 0)
}
