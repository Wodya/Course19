const http = require("http");
const url = require('url');
const {getFileNamesInDirectory, getHtmlFromFileList, isDir} = require("./utils");
const startWorker = require('./worker-init');

const server = http.createServer(async (request, response) => {
  if (request.method === 'GET') {
    const queryParams = url.parse(request.url, true).query;
    const content = await GetContent(queryParams.path);
    response.end(content);
  } else {
    response.end('Method Not Allowed');
  }
});

const rootDir = __dirname;
const GetContent =  async (pathStr) => {
  if(isDir(pathStr,rootDir)){
    const fileList = getFileNamesInDirectory(pathStr, rootDir);
    return getHtmlFromFileList(fileList, rootDir, pathStr);
  } else
    return startWorker({filepath: pathStr, rootDir});
};

module.exports = server;
