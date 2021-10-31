const fs = require('fs');
const path = require('path');
const {EOL} = require('os');

class Writes {
  fileSet = new Map();

  writeToFile(str)
  {
    let ipFind = str.match(/^(\d{1,4}\.\d{1,4}\.\d{1,4}\.\d{1,4})/);
    if (ipFind === null)
      return;
    let ip = ipFind[1];
    let stream = this.fileSet.get(ip);
    if(stream === undefined) {
      const fileName = `${ip}_requests.log`;
      stream = new fs.createWriteStream(fileName, {autoClose: false});
      this.fileSet.set(ip, stream);
      console.log(`Файл открыт: ${fileName}`)
      stream.on('error', err => {console.log(`Ошибка записи файла ${fileName}: ${err}`)});
      stream.on('close', () => {console.log(`Файл закрыт: ${fileName}`)});
    }

    stream.write(str + eol);
  }

  closeAllFiles(){
    for (let fileRow of this.fileSet)
      fileRow[1].close();
  }

}

let writes = new Writes();
let restString = "";
const eol = '\n'; // EOL = \r\n , а реально разделитель может быть как \r\n, так и \n
const stream = new fs.createReadStream('access.log');

stream.on('data', chunk => {
  let str = chunk.toString('utf-8');
  const strArr = str.split(eol);
  strArr[0] = restString + strArr[0];
  restString = "";
  if(str[str.length-1] !== eol) {
    restString = strArr[strArr.length - 1];
    strArr.splice(strArr.length-1,1);
  }
  for (let str of strArr)
    writes.writeToFile(str)
});

stream.on('end', () => {
  if(restString !== "") {
    writes.writeToFile(restString);
  }
  console.log('Чтение файла закончено');
  writes.closeAllFiles();
});

stream.on('error', err => {console.log(`Ошибка чтения файла: ${err}`)});

