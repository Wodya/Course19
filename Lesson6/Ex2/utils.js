const fs = require('fs');
const path = require('path');
const {EOL} = require('os');

const isDir = (filepath, rootDir) => {
    return filepath === undefined ? true : fs.lstatSync(path.join(rootDir, filepath)).isDirectory();
}

const getHtmlFromFileList = (fileList, rootDir, relativePath) => {
    let content = fileList.map(cur => {
        const element = isDir(cur, path.join(rootDir, relativePath ?? '')) ? `<h2>${cur}</h2>` : cur;
        return `<p><a href="?path=${path.join(relativePath??'', cur)}">${element}</a></p>`
    }).reduce((prev, cur) => prev + EOL + cur);
    let html = fs.readFileSync(path.join(__dirname,'file_list.html')).toString();
    html = html.replace('{{content}}', content);
    return html;
};

const getFileNamesInDirectory = (relativeDir, rootDir) => {
    return fs.readdirSync(path.join(rootDir,relativeDir ?? ''));
}

const showFileContents = (filepath, rootDir) => {
    const content = fs.readFileSync(path.join(rootDir,filepath)).toString().replace(new RegExp(EOL, 'g'), '<BR>');
    let html = fs.readFileSync(path.join(__dirname,'file_content.html')).toString();
    html = html.replace('{{content}}', content);
    return html;
}

module.exports = {
    isDir,
    getHtmlFromFileList,
    getFileNamesInDirectory,
    showFileContents,
}
