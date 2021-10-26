// 1. Просто выполняется
console.log('Record 1');

// Постановка в очередь макро задач
setTimeout(() => {
  // 4. Выполнение
  console.log('Record 2');
  // Постановка в очередь микро задач
  Promise.resolve().then(() => {
    // Постановка в очередь макро задач
    setTimeout(() => {
      // 5. Выполнение
      console.log('Record 3');
      // Постановка в очередь микро задач
      Promise.resolve().then(() => {
        //6. Выполнение
        console.log('Record 4');
      });
    });
  });
});

// 2. Просто выполняется
console.log('Record 5');

// Постановка в очередь микро задач
Promise.resolve().then(
  // Постановка в очередь микро задач
  () => Promise.resolve().then(
    // 3. Выполнение
    () => console.log('Record 6'))
);

// Record 1
// Record 5
// Record 6
// Record 2
// Record 3
// Record 4