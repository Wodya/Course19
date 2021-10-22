require('colors');
const {green, yellow, red} = require("colors");

let beginNumber = Number(process.argv[2]);
let endNumber = Number(process.argv[3]);
if(isNaN(beginNumber) || isNaN(endNumber) || endNumber < beginNumber) {
  console.log('Диапазон указан неверно'.red);
  return;
}

let count=0;
let number = beginNumber;
while (number <= endNumber){
  if(number > 2 && isSimple(number))
    writeColorLog(number, count++ % 3);
  number++;
}
if(count === 0)
  console.log(`В диапазоне ${beginNumber} ... ${endNumber} нет простых чисел`.red);

function writeColorLog(number, colorCount){
  let color;
  if(colorCount === 0)
    color =  green;
  else if(colorCount === 1)
    color = yellow;
  else
    color = red;
  console.log(color(number));
}

function isSimple(number){
  if (number % 2 === 0)
    return false;

  for(let i=3;i <= number/2; i += 2) {
    if (number % i === 0)
      return false;
  }
  return true;
}