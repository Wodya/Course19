#!/usr/bin/env node
const {getFileNamesInDirectory, getHtmlFromFileList, showFileContents, isDir} = require('./utils');
const http = require('http');
const url = require('url');

http.createServer((request, response) => {
    if (request.method === 'GET') {
        const queryParams = url.parse(request.url, true).query;
        const content = GetContent(queryParams.path);
        response.end(content);
    } else {
        response.end('Method Not Allowed');
    }
}).listen(3000, 'localhost');

const rootDir = __dirname;
const GetContent =  (pathStr) => {
    if(isDir(pathStr,rootDir)){
        const fileList = getFileNamesInDirectory(pathStr, rootDir);
        return getHtmlFromFileList(fileList, rootDir, pathStr);
    } else
        return showFileContents(pathStr, rootDir);
};
