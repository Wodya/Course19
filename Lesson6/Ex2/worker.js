const { workerData, parentPort } = require('worker_threads');
const fs = require("fs");
const path = require("path");
const {EOL} = require("os");

const content = fs.readFileSync(path.join(workerData.rootDir, workerData.filepath)).toString().replace(new RegExp(EOL, 'g'), '<BR>');
let html = fs.readFileSync(path.join(__dirname, 'file_content.html')).toString();
parentPort.postMessage(html.replace('{{content}}', content));
