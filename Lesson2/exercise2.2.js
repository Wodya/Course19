const EventEmitter = require('events');

let eventEmitter = new EventEmitter();
let timerNums = 1;

for(let i=2; i< process.argv.length; i++) {
  let splitArr = process.argv[i].split("-");
  if(splitArr.length !== 4)
    throw 'Неверный формат входных данных';
  let now = new Date();
  let date = new Date(now.getFullYear() - splitArr[3], now.getMonth() - splitArr[2], now.getDate() - splitArr[1], now.getHours() - splitArr[0], now.getMinutes(), now.getSeconds());
  let difSec = Math.trunc((now.getTime() - date.getTime())/1000);
  // difSec = timerNums === 1? 10 : 20;
  // console.log(difSec);

  let timerNum = timerNums++;

  let tickFunc = () =>{
    if(--difSec === 0){
       eventEmitter.removeListener("tick", tickFunc);
       console.log(`Timer ${timerNum}. Finish.`);
    } else {
     console.log(`Timer ${timerNum}. Tick ${difSec}.`);
    }
  };
  eventEmitter.on("tick", tickFunc );
}

setInterval(() => eventEmitter.emit("tick"), 1000);

